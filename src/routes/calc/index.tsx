import { createFileRoute, Link } from '@tanstack/react-router';

interface Calculator {
  title: string;
  badges: React.ReactNode[];
  path: string;
}

interface Section {
  title: string;
  calculators: Calculator[];
}

const calculators: Section[] = [
  {
    title: 'Arterial blood gas',
    calculators: [
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
  },
  {
    title: 'Neurological emergencies',
    calculators: [
      {
        title: 'Glasgow Coma Scale',
        badges: [],
        path: '/calc/glasgow-coma-scale',
      },
    ],
  },
];

function CalcIndex() {
  return (
    <div className="flex-1 overflow-y-auto py-4">
      {calculators.map(section => (
        <div key={section.title} className="mb-6">
          <div className="divider divider-primary">{section.title}</div>
          <ul className="flex flex-wrap justify-center gap-1">
            {section.calculators.map(calc => (
              <Link
                to={calc.path}
                key={calc.title}
                className="card w-96 bg-base-200 card-sm shadow-sm hover:shadow-lg hover:bg-base-300 transition-all cursor-pointer"
              >
                <div className="card-body">
                  <h2 className="card-title">{calc.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    {calc.badges.map((badge, idx) => (
                      <div key={idx} className="badge badge-secondary">
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export const Route = createFileRoute('/calc/')({
  component: CalcIndex,
});
