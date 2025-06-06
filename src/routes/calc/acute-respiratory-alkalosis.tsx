import { createFileRoute } from '@tanstack/react-router';
import CalcHeader from '../../components/CalcHeader';
import Calculator from '../../components/Calculator';
import CalcTab from '../../components/CalcTab';
import { useState } from 'react';
import { PressureUnit, PressureUnits, safeCompute } from '../../utils/types';
import CalcNumberInput from '../../components/CalcNumberInput';
import CalcOutputPanel from '../../components/CalcOutputPanel';
import CalcOutputEntry from '../../components/CalcOutputEntry';
import CalcDivider from '../../components/CalcDivider';

function AcuteRespiratoryAlkalosis() {
  const [unit, setUnit] = useState<PressureUnit>('kPa');
  const [paCO2, setPaCO2] = useState<number>(Number.NaN);

  const bicarbonateComputed = safeCompute(
    paCO2 => {
      if (unit === 'kPa') {
        return Math.max(18, 24 - 1.5 * (5.3 - paCO2));
      } else {
        return Math.max(18, 24 - 0.2 * (40 - paCO2));
      }
    },
    [paCO2]
  );

  return (
    <Calculator>
      <CalcHeader
        title="Acute respiratory alkalosis"
        description={
          <>
            <p className="pb-2">
              If the primary abnormality is an acute respiratory alkalosis the
              bicarbonate normally falls by 1.5 mmol/L for each kPa fall in
              PaCO2 or 2 mmol/L for each 10 mm Hg down to a minimum of 18 mmol/L
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
        max={unit === 'kPa' ? 4.7 : 35}
        prefix={
          <>
            P<sub>a</sub>CO<sub>2</sub>
          </>
        }
        suffix={unit === 'kPa' ? `<4.7 kPa` : `<35 mmHg`}
      />
    </Calculator>
  );
}

export const Route = createFileRoute('/calc/acute-respiratory-alkalosis')({
  component: AcuteRespiratoryAlkalosis,
});
