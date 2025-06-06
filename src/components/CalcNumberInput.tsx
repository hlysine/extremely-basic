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
    <fieldset className="fieldset w-full">
      {topLabel && (
        <legend className="fieldset-legend opacity-80">{topLabel}</legend>
      )}
      <label className="input w-full input-lg">
        {prefix && <span className="shrink-0 block w-28">{prefix}</span>}
        <input
          type="number"
          className="grow"
          min={min}
          max={max}
          step={step}
          value={Number.isNaN(value) ? '' : value}
          onInput={e => {
            const newValue = parseFloat(e.currentTarget.value);
            if (!isNaN(newValue)) {
              setValue(newValue);
            }
          }}
          onBlur={e => {
            const newValue = parseFloat(e.currentTarget.value);
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
      {bottomLabel && <p className="label opacity-80">{bottomLabel}</p>}
    </fieldset>
  );
});
