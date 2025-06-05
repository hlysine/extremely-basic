import { memo } from 'react';

export interface CalcNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  topLabel?: React.ReactNode;
  bottomLabel?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export default memo(function CalcNumberInput({
  value,
  onChange,
  min,
  max,
  step,
  placeholder,
  topLabel,
  bottomLabel,
  prefix,
  suffix,
}: CalcNumberInputProps) {
  const setValue = (newValue: number) => {
    onChange(Math.max(min ?? -Infinity, Math.min(max ?? Infinity, newValue)));
  };
  return (
    <fieldset className="fieldset w-full max-w-400">
      {topLabel && <legend className="fieldset-legend">{topLabel}</legend>}
      <label className="input w-full input-lg">
        {prefix && <span className="shrink-0 block w-20">{prefix}</span>}
        <input
          type="number"
          className="grow"
          min={min}
          max={max}
          step={step}
          value={Number.isNaN(value) ? '' : value}
          onChange={e => {
            const newValue = parseFloat(e.target.value);
            if (!isNaN(newValue)) {
              setValue(newValue);
            }
          }}
          onBlur={e => {
            const newValue = parseFloat(e.target.value);
            if (!isNaN(newValue)) {
              setValue(newValue);
            }
          }}
          placeholder={placeholder}
        />
        {suffix && (
          <span className="badge badge-neutral badge-sm shrink-0">
            {suffix}
          </span>
        )}
      </label>
      {bottomLabel && <p className="label">{bottomLabel}</p>}
    </fieldset>
  );
});
