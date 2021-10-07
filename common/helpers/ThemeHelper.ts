import StorageHelper from './StorageHelper';

export type ThemeType = 'light' | 'dark';

export default class ThemeHelper {
  themeKey = '__MILESTONES_THEME_KEY__';
  theme: ThemeType = 'light';
  store: StorageHelper;

  constructor(storage: Storage) {
    this.store = new StorageHelper(storage);
  }

  getLocalTheme(): ThemeType {
    const themeMaybe: null | ThemeType = this.store.get(this.themeKey);
    const theme: ThemeType = themeMaybe || this.theme;
    this.setLocalTheme(theme);
    return theme;
  }

  setLocalTheme(themeMode: ThemeType) {
    this.store.set(this.themeKey, themeMode);
  }
}

