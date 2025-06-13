import { createLazyFileRoute } from '@tanstack/react-router';
import { SiteSettings, useSettings } from '../components/SettingsContext';

function SettingsToggle({
  settingsKey,
  label,
}: {
  settingsKey: keyof SiteSettings;
  label: string;
}) {
  const [value, setValue] = useSettings(settingsKey);
  return (
    <label className="label inline-flex justify-between items-center">
      <span className="text-base-content">{label}</span>
      <input
        type="checkbox"
        className="toggle"
        checked={value as boolean}
        onChange={e => setValue(e.target.checked)}
      />
    </label>
  );
}

function Settings() {
  return (
    <div className="flex-1 flex p-4 flex-col gap-2 w-full mt-2 max-w-[1000px] self-center">
      <h1 className="text-4xl font-bold">Extremely Basic</h1>
      <p className="text-xl">Acute medicine quick reference</p>
      <div className="divider" />
      <p>
        Install this site as a Progressive Web App for quick access. Select{' '}
        <b>Add to Home Screen</b> in your browser menu to get started.
      </p>
      <div className="divider" />
      <div className="flex flex-col gap-4 w-full max-w-[400px] self-center">
        <h2 className="text-2xl font-bold">Settings</h2>
        <SettingsToggle
          key="isDark"
          settingsKey="isDark"
          label="Use Dark Mode"
        />
      </div>
    </div>
  );
}

export const Route = createLazyFileRoute('/settings')({
  component: Settings,
});
