import { createFileRoute } from '@tanstack/react-router';
import CalcHeader from '../../components/calculator/CalcHeader';
import Calculator from '../../components/calculator/Calculator';
import { useState } from 'react';
import { safeCompute } from '../../utils/types';
import CalcNumberInput from '../../components/calculator/CalcNumberInput';
import CalcOutputPanel from '../../components/calculator/CalcOutputPanel';
import CalcOutputEntry from '../../components/calculator/CalcOutputEntry';
import CalcDivider from '../../components/calculator/CalcDivider';

function AnionGap() {
  const [sodium, setSodium] = useState<number>(Number.NaN);
  const [chloride, setChloride] = useState<number>(Number.NaN);
  const [bicarbonate, setBicarbonate] = useState<number>(Number.NaN);

  const anionGap = safeCompute(
    (sodium, chloride, bicarbonate) => {
      return sodium - (chloride + bicarbonate);
    },
    [sodium, chloride, bicarbonate]
  );

  return (
    <Calculator>
      <CalcHeader title="Anion Gap" id="anion-gap" />
      <CalcDivider>Results</CalcDivider>
      <CalcOutputPanel>
        <CalcOutputEntry
          prefix="Anion Gap"
          bottomLabel="Normal range: 8-16 mmol/L"
          value={anionGap}
          suffix={'mmol/L'}
        />
      </CalcOutputPanel>
      <CalcDivider>Inputs</CalcDivider>
      <CalcNumberInput
        value={sodium}
        onChange={value => setSodium(value)}
        min={0}
        prefix={'Sodium'}
        suffix={'mmol/L'}
      />
      <CalcNumberInput
        value={chloride}
        onChange={value => setChloride(value)}
        min={0}
        prefix={'Chloride'}
        suffix={'mmol/L'}
      />
      <CalcNumberInput
        value={bicarbonate}
        onChange={value => setBicarbonate(value)}
        min={0}
        prefix={'Bicarbonate'}
        suffix={'mmol/L'}
      />
    </Calculator>
  );
}

export const Route = createFileRoute('/calc/anion-gap')({
  component: AnionGap,
});
