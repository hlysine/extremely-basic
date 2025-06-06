import { createFileRoute } from '@tanstack/react-router';
import CalcHeader from '../../components/CalcHeader';
import Calculator from '../../components/Calculator';
import CalcTab from '../../components/CalcTab';
import { useState } from 'react';
import {
  format,
  PressureUnit,
  PressureUnits,
  safeCompute,
} from '../../utils/types';
import CalcNumberInput from '../../components/CalcNumberInput';
import CalcOutputPanel from '../../components/CalcOutputPanel';
import CalcOutputEntry from '../../components/CalcOutputEntry';
import CalcDivider from '../../components/CalcDivider';

function MetabolicAcidosis() {
  const [unit, setUnit] = useState<PressureUnit>('kPa');
  const [bicarbonate, setBicarbonate] = useState<number>(Number.NaN);

  const paCO2Min = safeCompute(
    bicarbonate => {
      if (unit === 'kPa') {
        return (1.5 * bicarbonate + 8 - 2) * 0.133;
      } else {
        return 1.5 * bicarbonate + 8 - 2;
      }
    },
    [bicarbonate]
  );
  const paCO2Max = safeCompute(
    bicarbonate => {
      if (unit === 'kPa') {
        return (1.5 * bicarbonate + 8 + 2) * 0.133;
      } else {
        return 1.5 * bicarbonate + 8 + 2;
      }
    },
    [bicarbonate]
  );

  return (
    <Calculator>
      <CalcHeader
        title="Metabolic acidosis"
        description={
          <>
            <p className="pb-2">
              If the primary abnormality is a metabolic acidosis the expected
              PaCO2 can be calculated from Winters formula.
            </p>
            <p className="pb-2">If PaCO2 is measured in kPa</p>
            <p className="pb-2">Expected PaCO2=[(1.5xHCO3)+8+-2]x0.133</p>
            <p className="pb-2">If PaCO2 is measured in mm Hg</p>
            <p className="pb-2">Expected PaCO2=1.5xHCO3+8+-2</p>
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
          value={
            <>
              {format(paCO2Min)} ~ {format(paCO2Max)}
            </>
          }
          suffix={unit === 'kPa' ? 'kPa' : 'mmHg'}
        />
      </CalcOutputPanel>
      <CalcDivider>Inputs</CalcDivider>
      <CalcNumberInput
        value={bicarbonate}
        onChange={value => setBicarbonate(value)}
        max={22}
        prefix="Bicarbonate"
        suffix="<22 mmol/L"
      />
    </Calculator>
  );
}

export const Route = createFileRoute('/calc/metabolic-acidosis')({
  component: MetabolicAcidosis,
});
