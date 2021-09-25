import * as React from 'react';
import { MainNav } from '../MainNav/MainNav';
import { Branding } from '../Branding/Branding';
import { Logo } from '../Logo/Logo';
import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';
import { ThemeType } from '../../../common/helpers/ThemeHelper';

type HeaderProps = {
  brand: string,
  theme: ThemeType,
  toggleTheme: () => void,
};

export const AppHeader = ({ brand, theme, toggleTheme }: HeaderProps) => {
  return (
    <header className="app-header">
      <Logo theme={theme} />
      <Branding brand={brand} />
      <MainNav />
      <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
    </header>
  );
};






