import { memo } from 'react';

export interface CalcDividerProps {
  children?: React.ReactNode;
}

export default memo(function CalcDivider({ children }: CalcDividerProps) {
  return <div className="divider text-sm -mb-0.5">{children}</div>;
});
