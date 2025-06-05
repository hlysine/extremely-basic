import { createFileRoute } from '@tanstack/react-router';
import CalcHeader from '../../components/CalcHeader';
import Calculator from '../../components/Calculator';
import { useState } from 'react';
import CalcOutputPanel from '../../components/CalcOutputPanel';
import CalcOutputEntry from '../../components/CalcOutputEntry';
import CalcDivider from '../../components/CalcDivider';
import CalcRadioInput from '../../components/CalcRadioInput';

function GlasgowComaScale() {
  const [motor, setMotor] = useState<number>(Number.NaN);
  const [verbal, setVerbal] = useState<number>(Number.NaN);
  const [eye, setEye] = useState<number>(Number.NaN);

  let totalComputed = 0;
  if (!Number.isNaN(motor)) {
    totalComputed += motor + 1;
  }
  if (!Number.isNaN(verbal)) {
    totalComputed += verbal + 1;
  }
  if (!Number.isNaN(eye)) {
    totalComputed += eye + 1;
  }

  return (
    <Calculator>
      <CalcHeader title="Glasgow Coma Scale" />
      <CalcDivider>Result</CalcDivider>
      <CalcOutputPanel>
        <CalcOutputEntry prefix="GCS" value={totalComputed} />
      </CalcOutputPanel>
      <CalcDivider>Inputs</CalcDivider>
      <CalcRadioInput
        value={motor}
        options={[
          'No response',
          'Extension to pain',
          'Spastic flexion to pain',
          'Withdrawal from pain',
          'Localizes to pain',
          'Obeys commands',
        ]}
        onChange={setMotor}
        topLabel="Motor response"
      />
      <CalcRadioInput
        value={verbal}
        options={[
          'No response',
          'Incomprehensible sounds',
          'Inappropriate words',
          'Confused',
          'Oriented',
        ]}
        onChange={setVerbal}
        topLabel="Verbal response"
      />
      <CalcRadioInput
        value={eye}
        options={['No response', 'To pain', 'To speech', 'Spontaneous']}
        onChange={setEye}
        topLabel="Eye opening"
      />
    </Calculator>
  );
}

export const Route = createFileRoute('/calc/glasgow-coma-scale')({
  component: GlasgowComaScale,
});
