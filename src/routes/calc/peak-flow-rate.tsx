import { createFileRoute } from '@tanstack/react-router';
import CalcHeader from '../../components/calculator/CalcHeader';
import Calculator from '../../components/calculator/Calculator';
import CalcTab from '../../components/calculator/CalcTab';
import { useState } from 'react';
import {
  HeightUnit,
  HeightUnits,
  PressureUnit,
  PressureUnits,
  safeCompute,
} from '../../utils/types';
import CalcNumberInput from '../../components/calculator/CalcNumberInput';
import CalcOutputPanel from '../../components/calculator/CalcOutputPanel';
import CalcOutputEntry from '../../components/calculator/CalcOutputEntry';
import CalcDivider from '../../components/calculator/CalcDivider';
import CalcDescription from '../../components/calculator/CalcDescription';

type Ethnicity = 'chinese' | 'other';
const Ethnicities = ['chinese', 'other'] as Ethnicity[];

function PeakFlowRate() {
  const [age, setAge] = useState<number>(Number.NaN);
  const [height, setHeight] = useState<number>(Number.NaN);
  const [unit, setUnit] = useState<HeightUnit>('cm');
  const [ethnicity, setEthnicity] = useState<Ethnicity>('chinese');

  const malePFR = safeCompute(
    (age, height) => {
      if (unit === 'inch') {
        height = height * 2.54;
      }
      if (ethnicity === 'chinese') {
        return -543.707 + 1.681 * age + 5.784 * height;
      } else {
        return Math.exp(
          0.544 * Math.log(age) - 0.0151 * age - 74.7 / height + 5.48
        );
      }
    },
    [age, height]
  );
  const femalePFR = safeCompute(
    (age, height) => {
      if (unit === 'inch') {
        height = height * 2.54;
      }
      if (ethnicity === 'chinese') {
        return -274.267 + 1.39 * age + 3.699 * height;
      } else {
        return Math.exp(
          0.376 * Math.log(age) - 0.012 * age - 58.8 / height + 5.63
        );
      }
    },
    [age, height]
  );

  return (
    <Calculator>
      <CalcHeader
        title="Peak expiratory flow rate"
        description={<CalcDescription descriptionKey="peak-flow-rate" />}
      />
      <CalcTab
        options={HeightUnits}
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
          topLabel="Expected PEFR of"
          prefix="Males"
          value={malePFR}
          suffix="L/min"
        />
        <CalcOutputEntry prefix="Females" value={femalePFR} suffix="L/min" />
      </CalcOutputPanel>
      <CalcDivider>Inputs</CalcDivider>
      <CalcNumberInput
        value={age}
        onChange={value => setAge(value)}
        min={0}
        prefix={'Age'}
      />
      <CalcNumberInput
        value={height}
        onChange={value => setHeight(value)}
        min={0}
        prefix={'Height'}
        suffix={unit}
      />
      <CalcTab
        options={Ethnicities}
        selected={ethnicity}
        className="capitalize tabs-box"
        onSelect={newChoice => {
          if (newChoice !== ethnicity) {
            setEthnicity(newChoice);
          }
        }}
      />
    </Calculator>
  );
}

export const Route = createFileRoute('/calc/peak-flow-rate')({
  component: PeakFlowRate,
});
