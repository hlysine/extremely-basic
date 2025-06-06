import { Link } from '@tanstack/react-router';
import { memo, useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { WikiPage } from '../utils/types';

export interface SearchableIndexProps {
  entries: WikiPage[];
  routeBase: string;
}

export default memo(function SearchableIndex({
  entries: allEntries,
  routeBase,
}: SearchableIndexProps) {
  const [searchString, setSearchString] = useState('');

  const sections = useMemo(() => {
    const filteredEntries =
      !searchString || searchString.length === 0
        ? allEntries
        : allEntries.filter(
            entry =>
              entry.title.toLowerCase().includes(searchString.toLowerCase()) ||
              entry.keywords.some(keyword =>
                keyword.toLowerCase().includes(searchString.toLowerCase())
              )
          );
    return filteredEntries.reduce<Record<string, WikiPage[]>>((acc, entry) => {
      if (!acc[entry.section]) {
        acc[entry.section] = [];
      }
      acc[entry.section].push(entry);
      return acc;
    }, {});
  }, [allEntries, searchString]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-2 mt-2">
      <label className="input w-full max-w-[400px]">
        <FaSearch />
        <input
          type="search"
          className="grow"
          placeholder="Search"
          value={searchString}
          onInput={e => setSearchString(e.currentTarget.value)}
        />
      </label>
      <div className="flex-1 overflow-y-auto py-4">
        {Object.entries(sections).map(([key, entries]) => (
          <div key={key} className="mb-6">
            <div className="divider divider-primary">{key}</div>
            <ul className="flex flex-wrap justify-center gap-1">
              {entries.map(entry => (
                <Link
                  to={routeBase + entry.key}
                  key={entry.title}
                  className="card w-96 bg-base-200 card-sm shadow-sm hover:shadow-lg hover:bg-base-300 transition-all cursor-pointer"
                >
                  <div className="card-body">
                    <h2 className="card-title">{entry.title}</h2>
                  </div>
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
});
