import {
  createRootRoute,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import PWAPrompt from '../components/PWAPrompt';
import ThemeToggle from '../components/ThemeToggle';
import { useEffect } from 'react';
import MouseDownLink from '../components/MouseDownLink';
import { useSettings } from '../components/SettingsContext';
import { dockTabs, tabs } from './-tabs';

function Dock() {
  const location = useRouterState({ select: state => state.location });
  const [, setActiveTab] = useSettings('activeTab');

  useEffect(() => {
    const tab = tabs.find(tab => location.pathname.startsWith(tab.to));
    if (tab) {
      document.title = `Extremely Basic - ${tab.name}`;
      if (tab.dock) setActiveTab(tab.to);
    }
  }, [location, setActiveTab]);

  if (location.pathname === '/') {
    return null; // Hide dock on the home page
  }

  return (
    <div className="dock static hide-on-type">
      {dockTabs.map(tab => (
        <MouseDownLink
          key={tab.name}
          to={tab.to}
          className={location.pathname.startsWith(tab.to) ? 'dock-active' : ''}
        >
          <tab.icon />
          <span className="dock-label">{tab.name}</span>
        </MouseDownLink>
      ))}
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <div className="w-full h-full flex flex-col">
      <PWAPrompt />
      <nav className="navbar py-0 bg-base-300 shadow-sm justify-between hide-on-type">
        <div className="breadcrumbs text-sm ms-2">
          <ul>
            <li>
              <a href="https://lysine-med.hf.space/">Med</a>
            </li>
            <li>
              <MouseDownLink to="/" className="btn btn-ghost text-xl">
                <img src="/logo.svg" alt="Logo" className="h-8 mr-2" />
                Extremely Basic
              </MouseDownLink>
            </li>
          </ul>
        </div>
        <ThemeToggle />
      </nav>
      <Outlet />
      <Dock />
      <TanStackRouterDevtools />
    </div>
  ),
});
