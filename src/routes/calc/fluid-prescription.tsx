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

function FluidPrescription() {
  const [bodyWeight, setBodyWeight] = useState<number>(Number.NaN);
  const [deficitPercent, setDeficitPercent] = useState<number>(Number.NaN);
  const [volumeLoss, setVolumeLoss] = useState<number>(Number.NaN);
  const [sodiumLoss, setSodiumLoss] = useState<number>(Number.NaN);
  const [potassiumLoss, setPotassiumLoss] = useState<number>(Number.NaN);

  const dailyFluidRequirement = safeCompute(
    bodyWeight => {
      const deficit = Number.isNaN(deficitPercent) ? 0 : deficitPercent;
      const ongoing = Number.isNaN(volumeLoss) ? 0 : volumeLoss;
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

  const sodiumRequirement = safeCompute(
    bodyWeight => {
      const ongoing =
        Number.isNaN(volumeLoss) || Number.isNaN(sodiumLoss)
          ? 0
          : sodiumLoss * (volumeLoss / 1000);
      return bodyWeight * 2 + ongoing;
    },
    [bodyWeight]
  );

  const potassiumRequirement = safeCompute(
    bodyWeight => {
      const ongoing =
        Number.isNaN(volumeLoss) || Number.isNaN(potassiumLoss)
          ? 0
          : potassiumLoss * (volumeLoss / 1000);
      return bodyWeight * 1 + ongoing;
    },
    [bodyWeight]
  );

  return (
    <Calculator>
      <CalcHeader
        title="Fluid Prescription"
        description={<CalcDescription descriptionKey="fluid-prescription" />}
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
        <CalcOutputEntry
          topLabel="Electrolyte requirement"
          prefix="Sodium"
          value={sodiumRequirement}
          suffix={'mmol'}
        />
        <CalcOutputEntry
          prefix="Potassium"
          value={potassiumRequirement}
          suffix={'mmol'}
        />
      </CalcOutputPanel>
      <CalcDivider>Inputs</CalcDivider>
      <CalcNumberInput
        value={bodyWeight}
        onChange={value => setBodyWeight(value)}
        min={0}
        topLabel="Maintenance"
        prefix={'Body weight'}
        suffix={'kg'}
      />
      <CalcNumberInput
        value={deficitPercent}
        onChange={value => setDeficitPercent(value)}
        min={0}
        topLabel="Deficit"
        prefix={'Deficit'}
        suffix={'%'}
      />
      <CalcNumberInput
        value={volumeLoss}
        onChange={value => setVolumeLoss(value)}
        min={0}
        topLabel="Ongoing loss"
        prefix={'Volume loss'}
        suffix={'mL/day'}
      />
      <CalcNumberInput
        value={sodiumLoss}
        onChange={value => setSodiumLoss(value)}
        min={0}
        prefix={'Na conc'}
        suffix={'mmol/L'}
      />
      <CalcNumberInput
        value={potassiumLoss}
        onChange={value => setPotassiumLoss(value)}
        min={0}
        prefix={'K conc'}
        suffix={'mmol/L'}
      />
    </Calculator>
  );
}

export const Route = createFileRoute('/calc/fluid-prescription')({
  component: FluidPrescription,
});
