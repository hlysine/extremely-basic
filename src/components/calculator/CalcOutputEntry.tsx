import React, { memo } from 'react';
import { format } from '../../utils/types';

export interface CalcOutputEntryProps {
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  value?: React.ReactNode;
  topLabel?: React.ReactNode;
  bottomLabel?: React.ReactNode;
}

export default memo(function CalcOutputEntry({
  suffix,
  prefix,
  value,
  topLabel,
  bottomLabel,
}: CalcOutputEntryProps) {
  return (
    <div className="flex flex-col w-full text-secondary-content">
      {topLabel && <div className="text-sm opacity-80">{topLabel}</div>}
      <div className="inline-flex items-center w-full">
        {prefix && <span className="mr-1 w-28 shrink-0 text-lg">{prefix}</span>}
        <div className="font-bold flex-1 text-xl">{format(value)}</div>
        {suffix && (
          <span className="badge badge-neutral badge-sm shrink-0">
            {suffix}
          </span>
        )}
      </div>
      {bottomLabel && <div className="text-sm opacity-80">{bottomLabel}</div>}
    </div>
  );
});
