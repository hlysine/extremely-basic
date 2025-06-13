import { memo } from 'react';
import { FaRegMoon } from 'react-icons/fa';
import { IoSunnyOutline } from 'react-icons/io5';
import { useSettings } from './SettingsContext';

export default memo(function ThemeToggle() {
  const [isDark, setIsDark] = useSettings('isDark');
  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        value="dark"
        className="theme-controller"
        checked={isDark}
        onChange={() => setIsDark(!isDark)}
      />

      <div className="swap-on p-2 fill-current">
        <FaRegMoon className="h-6 w-6" />
      </div>

      <div className="swap-off p-2 fill-current">
        <IoSunnyOutline className="h-6 w-6" />
      </div>
    </label>
  );
});
