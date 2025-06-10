import { createLazyFileRoute } from '@tanstack/react-router';
import drugsIndex from './drugs/-list.gen.json';
import conditionsIndex from './conditions/-list.gen.json';
import calcIndex from './calc/-list.gen.json';

const drugsContent = Object.entries(
  import.meta.glob<true, string, string>('../content/drugs/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  })
);
const conditionsContent = Object.entries(
  import.meta.glob<true, string, string>('../content/conditions/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  })
);
const calcContent = Object.entries(
  import.meta.glob<true, string, string>('../content/calc/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  })
);

interface PageEntry {
  title: string;
  section: string;
  keywords: string[];
  key: string;
}

interface SearchEntry extends PageEntry {
  id: string;
  content: string;
}

type SearchStore = Record<string, SearchEntry>;

const searchStore: SearchStore = {};
const searchIndex: SearchEntry[] = [];

function addToSearchStore(
  type: string,
  contentList: [string, string][],
  entry: PageEntry
) {
  const id = `${type}/${entry.key}`;
  const content =
    contentList.find(([key]) => key.endsWith(`${entry.key}.md`))?.[1] ?? '';
  const searchEntry: SearchEntry = {
    ...entry,
    id,
    content,
  };
  searchStore[id] = searchEntry;
  searchIndex.push(searchEntry);
}

drugsIndex.forEach(entry => {
  addToSearchStore('drugs', drugsContent, entry);
});
conditionsIndex.forEach(entry => {
  addToSearchStore('conditions', conditionsContent, entry);
});
calcIndex.forEach(entry => {
  addToSearchStore('calc', calcContent, entry);
});

function Search() {
  console.log(searchIndex);
}

export const Route = createLazyFileRoute('/search')({
  component: Search,
});
