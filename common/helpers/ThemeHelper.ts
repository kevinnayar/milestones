export type ThemeType = 'light' | 'dark';

export default class ThemeHelper {
  themeKey = '__MILESTONES_THEME_KEY__';
  theme: ThemeType = 'light';
  // store: StorageHelper;
  storage: Storage;

  constructor(storage: Storage) {
    // this.store = new StorageHelper(storage);
    this.storage = storage;
  }

  getLocalTheme(): ThemeType {
    const themeMaybe: null | string = this.storage.getItem(this.themeKey);
    const theme: ThemeType = themeMaybe as ThemeType || this.theme;
    this.setLocalTheme(theme);
    return theme;
  }

  setLocalTheme(themeMode: ThemeType) {
    this.storage.setItem(this.themeKey, themeMode);
  }
}

