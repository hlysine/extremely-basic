import { useState } from 'react';
import { cn } from '../utils/uiUtils';

export interface CollapsibleSectionsProps<T> {
  sections: Record<string, T[]>;
  children: (item: T) => React.ReactNode;
}

export default function CollapsibleSections<T>({
  sections,
  children,
}: CollapsibleSectionsProps<T>) {
  const [selectedSection, setSelectedSection] = useState<string | null>('*');
  const updateSelection = (section: string | null) => {
    if (Object.keys(sections).length === 1) {
      setSelectedSection('*');
    } else {
      setSelectedSection(section);
    }
  };
  return (
    <div className="flex-1 overflow-y-auto pb-4 w-full">
      {Object.entries(sections).map(([key, entries]) => {
        const isSelected = selectedSection === key || selectedSection === '*';
        return (
          <div key={key} className="mb-6">
            <a
              className={cn(
                'divider cursor-pointer',
                isSelected ? 'divider-accent' : 'divider-primary'
              )}
              onClick={() => {
                if (selectedSection === null) {
                  updateSelection(key);
                } else if (selectedSection === key) {
                  updateSelection('*');
                } else if (selectedSection === '*') {
                  updateSelection(null);
                } else {
                  updateSelection(key);
                }
              }}
            >
              {key}
            </a>
            {isSelected ? (
              <ul className="flex flex-wrap justify-center">
                {entries.map(entry => children(entry))}
              </ul>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
