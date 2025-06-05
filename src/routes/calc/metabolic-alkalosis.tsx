import { createFileRoute } from '@tanstack/react-router';
import CalcHeader from '../../components/CalcHeader';
import Calculator from '../../components/Calculator';
import CalcTab from '../../components/CalcTab';
import { useState } from 'react';
import { PressureUnit, PressureUnits, safeCompute } from '../../types';
import CalcNumberInput from '../../components/CalcNumberInput';
import CalcOutputPanel from '../../components/CalcOutputPanel';
import CalcOutputEntry from '../../components/CalcOutputEntry';
import CalcDivider from '../../components/CalcDivider';

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
      <CalcHeader
        title="Metabolic alkalosis"
        description={
          <>
            <p className="pb-2">
              If the primary abnormality is a metabolic alkalosis the PaCO2
              normally rises by 0.1 kPa or 0.75 mm Hg for every 1 mmol/l rise in
              bicarbonate concentration up to a maximum of approximately 8 kPa
              or 60 mm Hg
            </p>
            <p>
              A lower than expected PaCO2 suggests a concurrent respiratory
              alkalosis. A higher than expected PaCO2 suggests a concurrent
              respiratory acidosis
            </p>
          </>
        }
      />
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
