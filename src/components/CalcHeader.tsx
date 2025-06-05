import { memo } from 'react';
import { BsChevronCompactDown } from 'react-icons/bs';

export interface CalcHeaderProps {
  title: string;
  description?: React.ReactNode;
}

export default memo(function CalcHeader({
  title,
  description,
}: CalcHeaderProps) {
  return (
    <div className="collapse bg-base-200">
      <input type="checkbox" />
      <div className="collapse-title font-semibold text-xl flex flex-col items-center gap-1">
        {title}
        <BsChevronCompactDown />
      </div>
      <div className="collapse-content text-sm">{description}</div>
    </div>
  );
});
