import * as React from 'react';
import { ThemeType } from 'shared/helpers/ThemeHelper';

export const ThemeSwitch = (props: { theme: ThemeType, toggleTheme: () => void }) => {
  return (
    <div className={`theme-switch theme-switch--${props.theme}`}>
      <div className="theme-switch__toggle" onClick={props.toggleTheme}>
        <div className="theme-switch__notch" />
      </div>
    </div>
  );
};




