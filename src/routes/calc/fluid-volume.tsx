import { createFileRoute } from '@tanstack/react-router';
import CalcHeader from '../../components/calculator/CalcHeader';
import Calculator from '../../components/calculator/Calculator';
import { useState } from 'react';
import { safeCompute } from '../../utils/types';
import CalcNumberInput from '../../components/calculator/CalcNumberInput';
import CalcOutputPanel from '../../components/calculator/CalcOutputPanel';
import CalcOutputEntry from '../../components/calculator/CalcOutputEntry';
import CalcDivider from '../../components/calculator/CalcDivider';
import CalcDescription from '../../components/calculator/CalcDescription';

function FluidVolume() {
  const [bodyWeight, setBodyWeight] = useState<number>(Number.NaN);
  const [deficitPercent, setDeficitPercent] = useState<number>(Number.NaN);
  const [ongoingLosses, setOngoingLosses] = useState<number>(Number.NaN);

  const dailyFluidRequirement = safeCompute(
    bodyWeight => {
      const deficit = Number.isNaN(deficitPercent) ? 0 : deficitPercent;
      const ongoing = Number.isNaN(ongoingLosses) ? 0 : ongoingLosses;
      let maintenance = 0;
      if (bodyWeight <= 10) {
        maintenance = bodyWeight * 100;
      } else if (bodyWeight <= 20) {
        maintenance = 1000 + (bodyWeight - 10) * 50;
      } else {
        maintenance = 1500 + (bodyWeight - 20) * 20;
      }
      const deficitVolume = (deficit / 100) * bodyWeight * 1000;
      return maintenance + deficitVolume + ongoing;
    },
    [bodyWeight]
  );

  const perHour = safeCompute(total => total / 24, [dailyFluidRequirement]);

  return (
    <Calculator>
      <CalcHeader
        title="Fluid Volume"
        description={<CalcDescription descriptionKey="fluid-volume" />}
      />
      <CalcDivider>Results</CalcDivider>
      <CalcOutputPanel>
        <CalcOutputEntry
          topLabel="Daily fluid requirement"
          prefix="Total"
          value={dailyFluidRequirement}
          suffix={'mL'}
        />
        <CalcOutputEntry prefix="Per hour" value={perHour} suffix={'mL/hr'} />
      </CalcOutputPanel>
      <CalcDivider>Inputs</CalcDivider>
      <CalcNumberInput
        value={bodyWeight}
        onChange={value => setBodyWeight(value)}
        min={0}
        prefix={'Body weight'}
        suffix={'kg'}
      />
      <CalcNumberInput
        value={deficitPercent}
        onChange={value => setDeficitPercent(value)}
        min={0}
        prefix={'Deficit'}
        suffix={'%'}
      />
      <CalcNumberInput
        value={ongoingLosses}
        onChange={value => setOngoingLosses(value)}
        min={0}
        prefix={'Daily loss'}
        suffix={'mL/day'}
      />
    </Calculator>
  );
}

export const Route = createFileRoute('/calc/fluid-volume')({
  component: FluidVolume,
});
