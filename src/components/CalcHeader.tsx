import { memo } from 'react';
import { cn } from '../utils/uiUtils';

export interface CalcHeaderProps {
  title: string;
  description?: React.ReactNode;
}

export default memo(function CalcHeader({
  title,
  description,
}: CalcHeaderProps) {
  return (
    <div
      className={cn(
        'collapse bg-base-200',
        description ? 'collapse-arrow' : 'collapse-open'
      )}
    >
      <input type="checkbox" />
      <div className="collapse-title font-semibold text-xl flex flex-col items-center gap-1">
        {title}
      </div>
      {description && (
        <div className="collapse-content text-sm">{description}</div>
      )}
    </div>
  );
});
