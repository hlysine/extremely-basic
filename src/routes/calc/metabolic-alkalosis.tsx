import { createFileRoute } from '@tanstack/react-router';
import CalcHeader from '../../components/calculator/CalcHeader';
import Calculator from '../../components/calculator/Calculator';
import CalcTab from '../../components/calculator/CalcTab';
import { useState } from 'react';
import { PressureUnit, PressureUnits, safeCompute } from '../../utils/types';
import CalcNumberInput from '../../components/calculator/CalcNumberInput';
import CalcOutputPanel from '../../components/calculator/CalcOutputPanel';
import CalcOutputEntry from '../../components/calculator/CalcOutputEntry';
import CalcDivider from '../../components/calculator/CalcDivider';

function MetabolicAlkalosis() {
  const [unit, setUnit] = useState<PressureUnit>('kPa');
  const [bicarbonate, setBicarbonate] = useState<number>(Number.NaN);

  const paCO2 = safeCompute(
    bicarbonate => {
      if (unit === 'kPa') {
        return Math.min(8, 5.3 + 0.1 * (bicarbonate - 24));
      } else {
        return Math.min(60, 40 + 0.75 * (bicarbonate - 24));
      }
    },
    [bicarbonate]
  );

  return (
    <Calculator>
      <CalcHeader title="Metabolic alkalosis" id="metabolic-alkalosis" />
      <CalcTab
        options={PressureUnits}
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
          topLabel="Expected value of"
          prefix={
            <>
              P<sub>a</sub>CO<sub>2</sub>
            </>
          }
          value={paCO2}
          suffix={unit === 'kPa' ? 'kPa' : 'mmHg'}
        />
      </CalcOutputPanel>
      <CalcDivider>Inputs</CalcDivider>
      <CalcNumberInput
        value={bicarbonate}
        onChange={value => setBicarbonate(value)}
        min={26}
        prefix="Bicarbonate"
        suffix=">26 mmol/L"
      />
    </Calculator>
  );
}

export const Route = createFileRoute('/calc/metabolic-alkalosis')({
  component: MetabolicAlkalosis,
});
