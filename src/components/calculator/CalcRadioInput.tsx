import { memo, useId } from 'react';
import { cn } from '../../utils/uiUtils';

export interface CalcRadioInputProps {
  value: number;
  options: string[];
  onChange: (value: number) => void;
  topLabel?: React.ReactNode;
  bottomLabel?: React.ReactNode;
}

export default memo(function CalcRadioInput({
  value,
  onChange,
  topLabel,
  bottomLabel,
  options,
}: CalcRadioInputProps) {
  const id = useId();
  const name = `radio-${id}`;
  return (
    <fieldset className="fieldset w-full">
      {topLabel && (
        <legend className="fieldset-legend opacity-80">{topLabel}</legend>
      )}
      <label className="w-full flex flex-col">
        {options.map((option, idx) => (
          <button
            key={option}
            name={name}
            className={cn('btn', { 'btn-primary': value === idx })}
            value={option}
            onClick={() => onChange(idx)}
          >
            {option}
          </button>
        ))}
      </label>
      {bottomLabel && <p className="label opacity-80">{bottomLabel}</p>}
    </fieldset>
  );
});
