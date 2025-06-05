import { memo } from 'react';

export interface CalculatorProps {
  children: React.ReactNode;
}

export default memo(function Calculator({ children }: CalculatorProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 flex items-start justify-center">
      <div className="flex flex-col shrink-0 items-center gap-2 max-w-[400px]">
        {children}
      </div>
    </div>
  );
});
