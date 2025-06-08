import { memo, useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { WikiPage } from '../utils/types';
import CollapsibleSections from './CollapsibleSections';
import MouseDownLink from './MouseDownLink';

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
    <div className="flex-1 flex flex-col items-center justify-center gap-2 w-full mt-2 max-w-[1000px] self-center">
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
      <CollapsibleSections sections={sections}>
        {entry => (
          <MouseDownLink
            to={routeBase + entry.key}
            key={entry.title}
            className="w-96 bg-base-200 text-base border-b border-neutral/30 py-3 px-6 hover:bg-base-300 transition-all cursor-pointer"
          >
            {entry.title}
          </MouseDownLink>
        )}
      </CollapsibleSections>
    </div>
  );
});
