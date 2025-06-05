import { createFileRoute } from '@tanstack/react-router';
import CalcHeader from '../../components/CalcHeader';
import Calculator from '../../components/Calculator';
import CalcTab from '../../components/CalcTab';
import { useState } from 'react';
import { PressureUnit, PressureUnits } from '../../types';
import CalcNumberInput from '../../components/CalcNumberInput';

function OxygenGradient() {
  const [unit, setUnit] = useState<PressureUnit>('kPa');
  const [paO2, setPaO2] = useState<number>(Number.NaN);
  const [paCO2, setPaCO2] = useState<number>(Number.NaN);
  const [fiO2, setFiO2] = useState<number>(Number.NaN);
  return (
    <Calculator>
      <CalcHeader
        title="A-a gradient"
        description={
          <p>
            The A-a gradient is a measure of the difference between the alveolar
            and arterial oxygen tensions. It is used to assess the efficiency of
            gas exchange in the lungs.
          </p>
        }
      />
      <CalcTab options={PressureUnits} selected={unit} onSelect={setUnit} />
      <CalcNumberInput
        value={paO2 ?? 0}
        onChange={value => setPaO2(value)}
        min={0}
        prefix={
          <>
            PaO<sub>2</sub>
          </>
        }
        suffix={unit}
      />
      <CalcNumberInput
        value={fiO2 ?? 0}
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
        value={paCO2 ?? 0}
        onChange={value => setPaCO2(value)}
        min={0}
        prefix={
          <>
            PaCO<sub>2</sub>
          </>
        }
        suffix={unit}
      />
    </Calculator>
  );
}

export const Route = createFileRoute('/calc/oxygen-gradient')({
  component: OxygenGradient,
});
