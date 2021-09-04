export type ThemeType = 'light' | 'dark';

export default class ThemeHelper {
  themeKey = '__MILESTONES_THEME_KEY__';
  defaultThemeMode: ThemeType = 'light';
  storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  getLocalTheme(): ThemeType {
    const themeMaybe: null | string = this.storage.getItem(this.themeKey);
    const theme: ThemeType = ['light', 'dark'].includes(themeMaybe) ? themeMaybe as ThemeType : this.defaultThemeMode;
    this.setLocalTheme(theme);
    return theme;
  }

  setLocalTheme(themeMode: ThemeType) {
    this.storage.setItem(this.themeKey, themeMode);
  }
}

