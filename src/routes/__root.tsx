import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import PWAPrompt from '../components/PWAPrompt';
import { FaBookMedical, FaCalculator, FaSyringe } from 'react-icons/fa';

const dockTabs = [
  {
    name: 'Calculators',
    icon: <FaCalculator />,
    to: '/calc',
  },
  {
    name: 'Conditions',
    icon: <FaBookMedical />,
    to: '/conditions',
  },
  {
    name: 'Drugs',
    icon: <FaSyringe />,
    to: '/drugs',
  },
];

export const Route = createRootRoute({
  component: () => (
    <div className="w-full h-full flex flex-col">
      <PWAPrompt />
      <nav className="navbar bg-base-300 shadow-sm">
        <div className="breadcrumbs text-sm ms-2">
          <ul>
            <li>
              <a href="https://lysine-med.hf.space/">Med</a>
            </li>
            <li>
              <Link to="/" className="btn btn-ghost text-xl">
                <img src="/logo.svg" alt="Logo" className="h-8 mr-2" />
                Extremely Basic
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
      <div className="dock static">
        {dockTabs.map(tab => (
          <Link key={tab.name} to={tab.to}>
            {tab.icon}
            <span className="dock-label">{tab.name}</span>
          </Link>
        ))}
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
});
