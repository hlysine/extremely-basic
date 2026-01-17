import { memo } from 'react';
import { cn } from '../../utils/uiUtils';
import CalcDescription from './CalcDescription';
import AddToBookmark from '../AddToBookmark';
import allEntries from '../../routes/calc/-list.gen.json';

export interface CalcHeaderProps {
  title: string;
  id: string;
}

export default memo(function CalcHeader({ title, id }: CalcHeaderProps) {
  return (
    <>
      <AddToBookmark
        link={`/calc/${id}`}
        title={allEntries.find(entry => entry.key === id)?.title ?? ''}
      />
      <div className={cn('collapse bg-base-200', 'collapse-arrow')}>
        <input type="checkbox" />
        <div className="collapse-title font-semibold text-xl flex flex-col items-center gap-1">
          {title}
        </div>
        <div className="collapse-content text-sm">
          <CalcDescription descriptionKey={id} />
        </div>
      </div>
    </>
  );
});
