import { createLazyFileRoute } from '@tanstack/react-router';
import drugsIndex from './drugs/-list.gen.json';
import conditionsIndex from './conditions/-list.gen.json';
import calcIndex from './calc/-list.gen.json';
import { useEffect, useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import MouseDownLink from '../components/MouseDownLink';
import debounce from 'lodash/debounce';
import MiniSearch, { SearchResult } from 'minisearch';
import { markdownToText } from '../utils/markdownUtils';

console.time('Search Indexing');

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
    content: markdownToText(content),
  };
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

const miniSearch = new MiniSearch({
  fields: ['title', 'section', 'keywords', 'content'],
  storeFields: ['id', 'title', 'section', 'keywords', 'content', 'key'],
  searchOptions: {
    boost: { title: 2, section: 1.5, keywords: 1.2 },
    fuzzy: 0.2,
    prefix: true,
  },
});
miniSearch.addAll(searchIndex);

interface PageResult extends Omit<SearchResult, 'id'>, SearchEntry {
  preview: string;
  terms: string[];
}

const defaultResult = searchIndex.map(entry => ({
  ...entry,
  preview: '',
  terms: [],
}));

const textFragmentRegex = /^(.*?)[^\w\s].*[^\w\s](.*?)$/s;

function createTextFragment(target: string) {
  target = target.trim();
  const match = textFragmentRegex.exec(target);
  if (!match) return encodeURIComponent(target);
  return (
    encodeURIComponent(match[1].trim()) +
    ',' +
    encodeURIComponent(match[2].trim())
  );
}

console.timeEnd('Search Indexing');

function Search() {
  const [query, setQuery] = useState(localStorage.getItem('searchQuery') ?? '');
  const results = useMemo(() => {
    if (query.length === 0) return defaultResult;
    const searchResults = miniSearch.search(query) as unknown as PageResult[];
    return searchResults.map(result => ({
      ...result,
      preview:
        new RegExp(`^.*${result.terms[0]}.*$`, 'mi').exec(
          result.content
        )?.[0] ?? '',
    }));
  }, [query]);

  useEffect(() => {
    localStorage.setItem('searchQuery', query);
  }, [query]);

  const debounceInput = useMemo(
    () =>
      debounce(
        (value: string) => {
          setQuery(value);
        },
        100,
        { leading: false, trailing: true }
      ),
    []
  );

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-2 w-full mt-2 max-w-[1000px] self-center">
      <label className="input w-full max-w-[400px]">
        <FaSearch />
        <input
          type="search"
          className="grow"
          placeholder="Search"
          value={query}
          onFocus={e => e.target.select()}
          onInput={e => debounceInput(e.currentTarget.value)}
        />
      </label>
      <div className="flex-1 flex flex-col justify-start items-center overflow-y-auto pb-4 w-full">
        {results.map(result => (
          <MouseDownLink
            to={
              '/' + result.id + '#:~:text=' + createTextFragment(result.preview)
            }
            key={result.id}
            className="shrink-0 flex flex-col gap-1 w-96 bg-base-200 text-base border-b border-neutral/30 py-3 px-6 hover:bg-base-300 transition-all cursor-pointer"
          >
            <div className="breadcrumbs text-xs py-0 opacity-60">
              <ul>
                <li className="capitalize">{result.id.split('/')[0]}</li>
                <li>{result.section}</li>
              </ul>
            </div>
            {result.title}
            <div className="opacity-60 text-xs max-h-6 text-ellipsis overflow-hidden whitespace-nowrap">
              {result.preview}
            </div>
          </MouseDownLink>
        ))}
      </div>
    </div>
  );
}

export const Route = createLazyFileRoute('/search')({
  component: Search,
});
