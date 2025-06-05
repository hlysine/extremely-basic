import { createFileRoute, Link } from '@tanstack/react-router';

interface Calculator {
  title: string;
  badges: string[];
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
        badges: ['kPa', 'mmHg'],
        path: '/calc/oxygen-gradient',
      },
    ],
  },
];

function Index() {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {calculators.map(section => (
        <div key={section.title} className="mb-6">
          <div className="divider divider-primary">{section.title}</div>
          <ul className="flex flex-col gap-2">
            {section.calculators.map(calc => (
              <Link
                to={calc.path}
                key={calc.title}
                className="card w-96 bg-base-200 card-sm shadow-sm hover:shadow-lg hover:bg-base-300 transition-all cursor-pointer"
              >
                <div className="card-body">
                  <h2 className="card-title">{calc.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    {calc.badges.map(badge => (
                      <div key={badge} className="badge badge-secondary">
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

export const Route = createFileRoute('/')({
  component: Index,
});
