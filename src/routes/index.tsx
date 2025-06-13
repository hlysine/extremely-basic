import { createFileRoute } from '@tanstack/react-router';
import { pinnedTabs, Tab, tabs } from './-tabs';
import MouseDownLink from '../components/MouseDownLink';

function HomePageIcon({ tab }: { tab: Tab }) {
  return (
    <MouseDownLink
      to={tab.to}
      className="flex flex-col items-center gap-2 p-4 hover:bg-base-300 transition-colors"
    >
      <tab.icon className="w-10 h-10 text-secondary" />
      <div className="text-center w-full text-sm">{tab.name}</div>
    </MouseDownLink>
  );
}

function IconGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col pt-4">
      <div className="grid grid-cols-3">{children}</div>
      <div className="divider" />
    </div>
  );
}

function HomePage() {
  return (
    <div className="flex-1 p-2 overflow-y-auto self-center w-full max-w-[1000px] bg-base-200">
      <IconGroup>
        {tabs.map(tab => (
          <HomePageIcon key={tab.name} tab={tab} />
        ))}
      </IconGroup>
      <IconGroup>
        {pinnedTabs.map(tab => (
          <HomePageIcon key={tab.name} tab={tab} />
        ))}
      </IconGroup>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: HomePage,
});
