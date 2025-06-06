import { Plugin } from 'vite';
import path from 'path';
import fg from 'fast-glob';

export interface Config {
  entries: {
    folderPath: string;
    output: string;
  }[];
}

interface OutputEntry {
  title: string;
  section: string;
  keywords: string[];
  key: string;
}

function stripExtension(path: string) {
  return path.split('.').slice(0, -1).join('.');
}

function parseMarkdownMetadata(markdown: string): OutputEntry | undefined {
  const metadata: OutputEntry = {
    title: '',
    section: '',
    keywords: [],
    key: '',
  };

  const metadataMatch = /^---\s*$(.+)^---\s*$/ms.exec(markdown);
  if (!metadataMatch) {
    return undefined;
  }
  const metadataContent = metadataMatch[1];
  const lines = metadataContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim();
    switch (key) {
      case 'title':
        metadata.title = value;
        break;
      case 'section':
        metadata.section = value;
        break;
      case 'keywords':
        metadata.keywords = value.split(',').map(keyword => keyword.trim());
        break;
      default:
        // Ignore unknown keys
        break;
    }
  }
  if (!metadata.title || !metadata.section) {
    return undefined;
  }
  return metadata;
}

async function generateIndex(config: Config) {
  console.log('♻️  Generating indices...');
  const now = performance.now();

  for (const entry of config.entries) {
    const entries: OutputEntry[] = [];
    const files = await fg('**/*.md', {
      cwd: entry.folderPath,
    });
    files.sort();
    for (const file of files) {
      const markdown = await Bun.file(
        path.resolve(entry.folderPath, file)
      ).text();

      const key = stripExtension(file);

      const metadata = parseMarkdownMetadata(markdown);
      if (!metadata) {
        console.warn(`⚠️  No metadata found in ${file}. Skipping...`);
        continue;
      }
      metadata.key = key;
      entries.push(metadata);
    }

    await Bun.write(
      path.resolve(process.cwd(), entry.output),
      JSON.stringify(entries, null, 2)
    );
  }

  console.log(
    '✅ Indices generated in',
    Math.round(performance.now() - now),
    'ms'
  );
}

let lock = false;

export function markdownIndex(config: Config): Plugin {
  const ROOT: string = process.cwd();

  const generate = async () => {
    if (lock) {
      return;
    }
    lock = true;
    try {
      await generateIndex(config);
    } catch (err) {
      console.error(err);
      console.info();
    }
    lock = false;
  };

  const handleFile = async (
    file: string,
    event: 'create' | 'update' | 'delete'
  ) => {
    const filePath = path.normalize(file);

    if (
      event === 'update' &&
      config.entries.map(e => path.resolve(ROOT, e.output)).includes(filePath)
    ) {
      // skip generating routes if the generated file is updated
      return;
    }

    const sourcePaths = config.entries.map(e => path.join(ROOT, e.folderPath));
    const scriptsPath = path.join(ROOT, 'scripts');

    if (
      sourcePaths.some(p => filePath.startsWith(p)) ||
      filePath.startsWith(scriptsPath)
    ) {
      await generate();
    }
  };

  return {
    name: 'vite-plugin-extremely-basic-markdown-index-generator',
    configResolved: async () => {
      await generate();
    },
    watchChange: async (file, context) => {
      if (['create', 'update', 'delete'].includes(context.event)) {
        await handleFile(file, context.event);
      }
    },
  };
}
