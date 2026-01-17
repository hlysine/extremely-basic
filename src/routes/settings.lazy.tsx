import { createLazyFileRoute } from '@tanstack/react-router';
import { SiteSettings, useSettings } from '../components/SettingsContext';
import { cn } from '../utils/uiUtils';

function SettingsToggle({
  settingsKey,
  label,
}: {
  settingsKey: keyof {
    [T in keyof SiteSettings as SiteSettings[T] extends boolean ? T : never]: T;
  };
  label: string;
}) {
  const [value, setValue] = useSettings(settingsKey);
  return (
    <label className="label inline-flex justify-between items-center">
      <span className="text-base-content">{label}</span>
      <input
        type="checkbox"
        className="toggle"
        checked={value}
        onChange={e => setValue(e.target.checked)}
      />
    </label>
  );
}

function ClearBookmarks() {
  const [bookmarks, setBookmarks] = useSettings('bookmarks');
  return (
    <div className="w-full flex flex-col">
      <button
        className={cn('btn', bookmarks.length === 0 && 'btn-disabled')}
        onClick={() =>
          (
            document.getElementById('clearBookmarksModal') as HTMLDialogElement
          ).showModal()
        }
      >
        Clear bookmarks
      </button>
      {bookmarks.length === 0 && (
        <p className="text-sm text-error mt-2">No bookmarks to clear.</p>
      )}
      <dialog id="clearBookmarksModal" className="modal">
        <div className="modal-box">
          <p>Are you sure you want to clear all bookmarks?</p>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-error"
                onClick={() => setBookmarks([])}
              >
                Yes
              </button>
            </form>
            <form method="dialog">
              <button className="btn">No</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

function Settings() {
  return (
    <div className="flex-1 flex p-4 flex-col gap-2 w-full mt-2 max-w-250 self-center">
      <h1 className="text-4xl font-bold">Extremely Basic</h1>
      <p className="text-xl">Acute medicine quick reference</p>
      <div className="divider" />
      <p>
        Install this site as a Progressive Web App for quick access. Select{' '}
        <b>Add to Home Screen</b> in your browser menu to get started.
      </p>
      <div className="divider" />
      <div className="flex flex-col gap-4 w-full max-w-100 self-center">
        <h2 className="text-2xl font-bold">Settings</h2>
        <SettingsToggle
          key="isDark"
          settingsKey="isDark"
          label="Use Dark Mode"
        />
        <ClearBookmarks />
      </div>
    </div>
  );
}

export const Route = createLazyFileRoute('/settings')({
  component: Settings,
});
