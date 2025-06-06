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

function AcuteRespiratoryAcidosis() {
  const [unit, setUnit] = useState<PressureUnit>('kPa');
  const [paCO2, setPaCO2] = useState<number>(Number.NaN);

  const bicarbonateComputed = safeCompute(
    paCO2 => {
      if (unit === 'kPa') {
        return Math.min(30, 24 + 0.75 * (paCO2 - 5.3));
      } else {
        return Math.min(30, 24 + 0.1 * (paCO2 - 40));
      }
    },
    [paCO2]
  );

  return (
    <Calculator>
      <CalcHeader
        title="Acute respiratory acidosis"
        description={
          <>
            <p className="pb-2">
              If the primary abnormality is an acute respiratory acidosis the
              bicarbonate normally rises by 0.75 mmol/L for each kPa rise in
              PaCO2 or 1 mmol/L for each 10 mm Hg up to a maximum of 30 mmol/L
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

export const Route = createFileRoute('/calc/acute-respiratory-acidosis')({
  component: AcuteRespiratoryAcidosis,
});
