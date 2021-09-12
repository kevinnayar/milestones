import { useState } from 'react';
import ThemeHelper, { ThemeType } from '../../shared/helpers/ThemeHelper';

export type UseThemeResult = {
  theme: ThemeType;
  toggleTheme: () => void;
};

export function useTheme(): UseThemeResult {
  const themeHelper = new ThemeHelper(window.localStorage);
  const [theme, setTheme] = useState<ThemeType>(themeHelper.getLocalTheme());

  document.body.classList.add(theme);

  const toggleTheme = () => {
    const newTheme: ThemeType = theme === 'light' ? 'dark' : 'light';
    document.body.classList.replace(theme, newTheme);
    setTheme(newTheme);
    themeHelper.setLocalTheme(newTheme);
  };

  return {
    theme,
    toggleTheme,
  };
}


