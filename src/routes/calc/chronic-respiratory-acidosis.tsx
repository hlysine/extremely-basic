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

function ChronicRespiratoryAcidosis() {
  const [unit, setUnit] = useState<PressureUnit>('kPa');
  const [paCO2, setPaCO2] = useState<number>(Number.NaN);

  const bicarbonateComputed = safeCompute(
    paCO2 => {
      if (unit === 'kPa') {
        return Math.min(36, 24 + 3 * (paCO2 - 5.3));
      } else {
        return Math.min(36, 24 + 0.25 * (paCO2 - 40));
      }
    },
    [paCO2]
  );

  return (
    <Calculator>
      <CalcHeader
        title="Chronic respiratory acidosis"
        description={
          <>
            <p className="pb-2">
              If the primary abnormality is a chronic respiratory acidosis the
              bicarbonate normally rises by 3 mmol/L for each kPa rise in PaCO2
              or 4 mmol/L for each 10 mm Hg up to a maximum of 36 mmol/L
            </p>
            <p>
              A lower than expected bicarbonate suggests a concurrent metabolic
              acidosis. Higher than expected bicarbonate suggests a concurrent
              metabolic alkalosis
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
          prefix="Bicarbonate"
          value={bicarbonateComputed}
          suffix="mmol/L"
        />
      </CalcOutputPanel>
      <CalcDivider>Inputs</CalcDivider>
      <CalcNumberInput
        value={paCO2}
        onChange={value => setPaCO2(value)}
        min={unit === 'kPa' ? 6 : 45}
        prefix={
          <>
            P<sub>a</sub>CO<sub>2</sub>
          </>
        }
        suffix={unit === 'kPa' ? `>6 kPa` : `>45 mmHg`}
      />
    </Calculator>
  );
}

export const Route = createFileRoute('/calc/chronic-respiratory-acidosis')({
  component: ChronicRespiratoryAcidosis,
});
