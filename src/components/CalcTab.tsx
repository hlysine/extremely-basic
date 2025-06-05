export interface CalcTabProps<T extends string> {
  options: T[];
  selected: T;
  onSelect: (option: T) => void;
}

export default function CalcTab<T extends string>({
  options,
  selected,
  onSelect,
}: CalcTabProps<T>) {
  return (
    <div role="tablist" className="tabs tabs-lg tabs-border">
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
