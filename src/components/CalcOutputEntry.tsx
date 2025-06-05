import React, { memo } from 'react';

export interface CalcOutputEntryProps {
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  value?: React.ReactNode;
  topLabel?: React.ReactNode;
  bottomLabel?: React.ReactNode;
}

function format(value: React.ReactNode): React.ReactNode {
  if (typeof value === 'number') {
    return value.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  }
  return value;
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
