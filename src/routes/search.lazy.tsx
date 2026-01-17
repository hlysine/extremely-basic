import { createLazyFileRoute } from '@tanstack/react-router';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import MouseDownLink from '../components/MouseDownLink';
import debounce from 'lodash/debounce';
import { PageResult, savedQuery, search } from './-search';

function SearchResults({ results }: { results: PageResult[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: results.length,
    getScrollElement: () => parentRef.current,
    getItemKey: index => results[index].id,
    estimateSize: index => (results[index].preview.length > 0 ? 89 : 69),
    overscan: 3,
  });

  return (
    <div ref={parentRef} className="flex-1 overflow-y-auto pb-4 w-full">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map(virtualRow => {
          const result = results[virtualRow.index];
          return (
            <MouseDownLink
              to={result.link}
              preload="intent"
              key={result.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="flex flex-col gap-1 w-96 bg-base-200 text-base border-b border-neutral/30 py-3 px-6 hover:bg-base-300 transition-all cursor-pointer"
            >
              <div className="breadcrumbs text-xs py-0 opacity-60">
                <ul>
                  <li className="capitalize">{result.id.split('/')[0]}</li>
                  <li>{result.section}</li>
                </ul>
              </div>
              {result.title}
              {result.preview.length > 0 ? (
                <div className="opacity-60 text-xs max-h-6 text-ellipsis overflow-hidden whitespace-nowrap">
                  {result.preview}
                </div>
              ) : null}
            </MouseDownLink>
          );
        })}
      </div>
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState(savedQuery);
  const results = useMemo(() => search(query), [query]);

  const debounceInput = useMemo(
    () =>
      debounce(
        (value: string) => {
          setQuery(value);
        },
        10,
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
      <SearchResults results={results} />
    </div>
  );
}

export const Route = createLazyFileRoute('/search')({
  component: Search,
});
