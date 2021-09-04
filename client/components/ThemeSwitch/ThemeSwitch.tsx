import * as React from 'react';
import { useState } from 'react';
import ThemeHelper from '../../../shared/helpers/themeHelper';

export const ThemeSwitch = React.memo((props: { themeHelper: ThemeHelper}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(props.themeHelper.getLocalTheme());

  const handleOnClick = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.body.classList.replace(theme, newTheme);
    setTheme(newTheme);
    props.themeHelper.setLocalTheme(newTheme);
  }

  return (
    <div className={`theme-switch theme-switch--${theme}`}>
      <div className="theme-switch__toggle" onClick={handleOnClick}>
        <div className="theme-switch__notch" />
      </div>
    </div>
  );
});
