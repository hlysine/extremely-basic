import { createFileRoute } from '@tanstack/react-router';
import CalcHeader from '../../components/calculator/CalcHeader';
import Calculator from '../../components/calculator/Calculator';
import { useState } from 'react';
import CalcOutputPanel from '../../components/calculator/CalcOutputPanel';
import CalcOutputEntry from '../../components/calculator/CalcOutputEntry';
import CalcDivider from '../../components/calculator/CalcDivider';
import CalcRadioInput from '../../components/calculator/CalcRadioInput';
import CalcDescription from '../../components/calculator/CalcDescription';

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
      <CalcHeader
        title="Glasgow Coma Scale"
        description={<CalcDescription descriptionKey="glasgow-coma-scale" />}
      />
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
