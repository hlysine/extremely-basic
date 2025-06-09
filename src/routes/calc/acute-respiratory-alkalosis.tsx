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
import CalcDescription from '../../components/calculator/CalcDescription';

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
          <CalcDescription descriptionKey="acute-respiratory-alkalosis" />
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
