import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import PWAPrompt from '../components/PWAPrompt';

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
                Quick Calc
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
