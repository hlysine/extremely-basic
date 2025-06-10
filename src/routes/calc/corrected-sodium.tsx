import { createFileRoute } from '@tanstack/react-router';
import CalcHeader from '../../components/calculator/CalcHeader';
import Calculator from '../../components/calculator/Calculator';
import CalcTab from '../../components/calculator/CalcTab';
import { useState } from 'react';
import {
  ElectrolyteUnit,
  ElectrolyteUnits,
  safeCompute,
} from '../../utils/types';
import CalcNumberInput from '../../components/calculator/CalcNumberInput';
import CalcOutputPanel from '../../components/calculator/CalcOutputPanel';
import CalcOutputEntry from '../../components/calculator/CalcOutputEntry';
import CalcDivider from '../../components/calculator/CalcDivider';
import CalcDescription from '../../components/calculator/CalcDescription';

function CorrectedSodium() {
  const [sodium, setSodium] = useState<number>(Number.NaN);
  const [glucose, setGlucose] = useState<number>(Number.NaN);
  const [unit, setUnit] = useState<ElectrolyteUnit>('mmol/L');

  const correctedSodium = safeCompute(
    (sodium, glucose) => {
      if (unit === 'mmol/L') {
        return sodium + (2.4 * (glucose - 5.5)) / 5.5;
      } else {
        return sodium + (2.4 * (glucose - 100)) / 100;
      }
    },
    [sodium, glucose]
  );

  return (
    <Calculator>
      <CalcHeader
        title="Corrected Sodium"
        description={<CalcDescription descriptionKey="corrected-sodium" />}
      />
      <CalcTab
        options={ElectrolyteUnits}
        selected={unit}
        onSelect={newUnit => {
          if (newUnit !== unit) {
            setUnit(newUnit);
          }
        }}
      />
      <CalcDivider>Results</CalcDivider>
      <CalcOutputPanel>
        <CalcOutputEntry
          topLabel="Corrected value of"
          prefix="Sodium"
          value={correctedSodium}
          suffix={'mmol/L'}
        />
      </CalcOutputPanel>
      <CalcDivider>Inputs</CalcDivider>
      <CalcNumberInput
        value={sodium}
        onChange={value => setSodium(value)}
        min={0}
        prefix={'Sodium'}
        suffix={'mmol/L'}
      />
      <CalcNumberInput
        value={glucose}
        onChange={value => setGlucose(value)}
        min={0}
        prefix={'Glucose'}
        suffix={unit}
      />
    </Calculator>
  );
}

export const Route = createFileRoute('/calc/corrected-sodium')({
  component: CorrectedSodium,
});
