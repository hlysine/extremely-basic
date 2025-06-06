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

function OxygenGradient() {
  const [unit, setUnit] = useState<PressureUnit>('kPa');
  const [paO2, setPaO2] = useState<number>(Number.NaN);
  const [fiO2, setFiO2] = useState<number>(Number.NaN);
  const [paCO2, setPaCO2] = useState<number>(Number.NaN);
  const [age, setAge] = useState<number>(Number.NaN);

  const paO2Computed = safeCompute(
    (fiO2, paCO2) => {
      if (unit === 'kPa') {
        return fiO2 * 94.5 - paCO2 * 1.25;
      } else {
        return fiO2 * 713 - paCO2 * 1.25;
      }
    },
    [fiO2, paCO2]
  );
  const aaGradient = safeCompute(
    (paO2, paO2Computed) => {
      return paO2Computed - paO2;
    },
    [paO2, paO2Computed]
  );
  const normalAaGradient = safeCompute(
    age => {
      if (unit === 'kPa') {
        return (age / 4 + 4) / 7.5;
      }
      return age / 4 + 4;
    },
    [age]
  );

  return (
    <Calculator>
      <CalcHeader
        title="A-a gradient"
        description={
          <>
            <p className="pb-2">
              This calculator assumes normal barometric pressure at sea level
              and will give inaccurate results at altitude.
            </p>
            <p>A-a gradient = PAO2-PaO2</p>
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
          prefix={
            <>
              P<sub>A</sub>O<sub>2</sub>
            </>
          }
          value={paO2Computed}
          suffix={unit}
        />
        <CalcOutputEntry
          prefix="A-a gradient"
          value={aaGradient}
          bottomLabel={
            normalAaGradient === '-' ? undefined : (
              <>Normal A-a gradient: {format(normalAaGradient)}</>
            )
          }
        />
      </CalcOutputPanel>
      <CalcDivider>Inputs</CalcDivider>
      <CalcNumberInput
        value={paO2}
        onChange={value => setPaO2(value)}
        min={0}
        prefix={
          <>
            P<sub>a</sub>O<sub>2</sub>
          </>
        }
        suffix={unit}
      />
      <CalcNumberInput
        value={fiO2}
        onChange={value => setFiO2(value)}
        min={0.21}
        max={1}
        prefix={
          <>
            FiO<sub>2</sub>
          </>
        }
        suffix=">0.21"
      />
      <CalcNumberInput
        value={paCO2}
        onChange={value => setPaCO2(value)}
        min={0}
        prefix={
          <>
            P<sub>a</sub>CO<sub>2</sub>
          </>
        }
        suffix={unit}
      />
      <CalcNumberInput
        value={age}
        onChange={value => setAge(value)}
        min={0}
        prefix="Age"
      />
    </Calculator>
  );
}

export const Route = createFileRoute('/calc/oxygen-gradient')({
  component: OxygenGradient,
});
