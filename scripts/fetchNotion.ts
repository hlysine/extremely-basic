import { Client } from '@notionhq/client';
import { NotionConverter } from 'notion-to-md';
import * as path from 'path';
import { MDXRenderer } from 'notion-to-md/plugins/renderer';
import { GenericExporter } from './notion/exporter';
import { PageReferenceManifestBuilder } from 'notion-to-md/utils';
import { rm } from 'fs/promises';

const profiles = {
  testing: {
    rootPage: '22c3e63e64d7802e87a3eb38b2204a57',
    calcDatabase: '22c3e63e64d78021bb39f3a8f0867551',
    conditionsDatabase: '22c3e63e64d7808e8082cef4bdaef830',
    treatmentsDatabase: '22c3e63e64d780379bc8f9e11f81b76e',
  },
  production: {
    rootPage: '2373e63e64d780dc8e18e4180d4236f6',
    calcDatabase: '2373e63e64d781198164cbb7dfaf7aa3',
    conditionsDatabase: '2373e63e64d78118bd16da9cbfe92768',
    treatmentsDatabase: '2373e63e64d781d4ad80fb943913ca91',
  },
};
const activeProfile = profiles.production;

await rm('./output', { recursive: true, force: true });
console.log('Cleaned output directory');
await rm('./public/media', { recursive: true, force: true });
console.log('Cleaned media directory');

const notion = new Client({ auth: process.env.NOTION_KEY });

const outputDir = './output';
const mediaDir = './public/media';

const calcDatabase = activeProfile.calcDatabase;
const conditionsDatabase = activeProfile.conditionsDatabase;
const treatmentsDatabase = activeProfile.treatmentsDatabase;

const builder = new PageReferenceManifestBuilder(notion, {
  urlPropertyNameNotion: 'URL',
});

await builder.build(activeProfile.rootPage);

const exporter = new GenericExporter({
  outputType: 'file',
  outputFolder: outputDir,
  urlPropertyNameNotion: 'URL',
});

const n2m = new NotionConverter(notion)
  .withPageReferences({
    urlPropertyNameNotion: 'URL',
  })
  .withExporter(exporter)
  .withRenderer(
    new MDXRenderer({
      frontmatter: {
        exclude: ['ID', 'URL'],
        rename: {
          Name: 'title',
          Section: 'section',
          Keywords: 'keywords',
        },
      },
    })
  )
  .downloadMediaTo({
    outputDir: mediaDir,
    // Update the links in markdown to point to the local media path
    transformPath: localPath => `/media/${path.basename(localPath)}`,
  });

async function convertWithMedia(pageId: string) {
  try {
    await n2m.convert(pageId);

    console.log(`✓ Converted page ${pageId} in ${outputDir}`);
  } catch (error) {
    console.error('Conversion failed:', error);
  }
}

async function enumerateDatabase(
  databaseId: string,
  cursor?: string
): Promise<string[]> {
  const response = await notion.databases.query({
    database_id: databaseId,
    start_cursor: cursor,
  });

  if (response.has_more && response.next_cursor) {
    return [
      ...response.results.map(result => result.id),
      ...(await enumerateDatabase(databaseId, response.next_cursor)),
    ];
  }
  return response.results.map(result => result.id);
}

async function convertAllInDatabase(databaseId: string) {
  const pageIds = await enumerateDatabase(databaseId);
  console.log(`Found ${pageIds.length} pages in database ${databaseId}`);

  for (const pageId of pageIds) {
    await convertWithMedia(pageId);
  }
}

await convertAllInDatabase(calcDatabase);
await convertAllInDatabase(conditionsDatabase);
await convertAllInDatabase(treatmentsDatabase);
