import { memo } from 'react';
import { cn } from '../utils/uiUtils';

export interface CalcOutputPanelProps {
  children: React.ReactNode;
  className?: string;
}

export default memo(function CalcOutputPanel({
  children,
  className,
}: CalcOutputPanelProps) {
  return (
    <div
      className={cn(
        `flex flex-col gap-2 p-4 bg-secondary w-full rounded-lg shadow-md`,
        className
      )}
    >
      {children}
    </div>
  );
});
