export default class StorageHelper {
  storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  get<T>(key: string): null | T {
    const itemMaybe = this.storage.getItem(key);

    if (itemMaybe === null) return null;

    const item: any = JSON.parse(itemMaybe) as T;
    return item;
  }

  set<T>(key: string, value: T) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}


