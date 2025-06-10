import { cn } from '../../utils/uiUtils';

export interface CalcTabProps<T extends string> {
  options: T[];
  selected: T;
  onSelect: (option: T) => void;
  className?: string;
}

export default function CalcTab<T extends string>({
  options,
  selected,
  onSelect,
  className,
}: CalcTabProps<T>) {
  return (
    <div
      role="tablist"
      className={cn(
        `tabs tabs-lg tabs-border w-full justify-center`,
        className
      )}
    >
      {options.map(option => (
        <a
          key={option}
          role="tab"
          className={`tab ${selected === option ? 'tab-active' : ''}`}
          onClick={() => onSelect(option)}
        >
          {option}
        </a>
      ))}
    </div>
  );
}
