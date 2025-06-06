import { createFileRoute, Link } from '@tanstack/react-router';
import CollapsibleSections from '../../components/CollapsibleSections';

interface Calculator {
  title: string;
  badges: React.ReactNode[];
  path: string;
}

const calculators: Record<string, Calculator[]> = {
  'Arterial blood gas': [
    {
      title: 'A-a gradient',
      badges: [
        <span key="PaO2">
          P<sub>a</sub>O<sub>2</sub>
        </span>,
        <span key="FiO2">
          FiO<sub>2</sub>
        </span>,
        <span key="PaCO2">
          P<sub>a</sub>CO<sub>2</sub>
        </span>,
        'Age',
      ],
      path: '/calc/oxygen-gradient',
    },
    {
      title: 'Acute respiratory acidosis',
      badges: [
        <span key="PaCO2">
          P<sub>a</sub>CO<sub>2</sub>
        </span>,
      ],
      path: '/calc/acute-respiratory-acidosis',
    },
    {
      title: 'Acute respiratory alkalosis',
      badges: [
        <span key="PaCO2">
          P<sub>a</sub>CO<sub>2</sub>
        </span>,
      ],
      path: '/calc/acute-respiratory-alkalosis',
    },
    {
      title: 'Chronic respiratory acidosis',
      badges: [
        <span key="PaCO2">
          P<sub>a</sub>CO<sub>2</sub>
        </span>,
      ],
      path: '/calc/chronic-respiratory-acidosis',
    },
    {
      title: 'Chronic respiratory alkalosis',
      badges: [
        <span key="PaCO2">
          P<sub>a</sub>CO<sub>2</sub>
        </span>,
      ],
      path: '/calc/chronic-respiratory-alkalosis',
    },
    {
      title: 'Metabolic acidosis',
      badges: ['Bicarbonate'],
      path: '/calc/metabolic-acidosis',
    },
    {
      title: 'Metabolic alkalosis',
      badges: ['Bicarbonate'],
      path: '/calc/metabolic-alkalosis',
    },
  ],
  'Neurological emergencies': [
    {
      title: 'Glasgow Coma Scale',
      badges: [],
      path: '/calc/glasgow-coma-scale',
    },
  ],
};

function CalcIndex() {
  return (
    <CollapsibleSections sections={calculators}>
      {entry => (
        <Link
          to={entry.path}
          key={entry.title}
          className="card w-96 bg-base-200 card-sm shadow-sm hover:shadow-lg hover:bg-base-300 transition-all cursor-pointer"
        >
          <div className="card-body">
            <h2 className="card-title">{entry.title}</h2>
            <div className="flex flex-wrap gap-2">
              {entry.badges.map((badge, idx) => (
                <div key={idx} className="badge badge-secondary">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </Link>
      )}
    </CollapsibleSections>
  );
}

export const Route = createFileRoute('/calc/')({
  component: CalcIndex,
});
