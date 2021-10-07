export default class CacheMechanism<T> {
  limit = 100;
  cache: { [key: string]: T } = {};
  cacheKeys: string[] = [];

  constructor(limit?: number) {
    if (limit) {
      this.limit = limit;
    }
  }

  set(key: string, item: T) {
    if (item === undefined) {
      throw new Error('Cannot store "undefined" in cache');
    }

    this.cache[key] = item;
    this.cacheKeys = [key, ...this.cacheKeys];

    if (this.cacheKeys.length > this.limit) {
      const lastKey = this.cacheKeys.pop();
      delete this.cache[lastKey];
    }
  }

  get(key: string): T {
    const item: void | T = this.cache[key];

    if (item !== undefined) {
      this.cacheKeys = this.cacheKeys.filter((k) => k !== key);
      this.cacheKeys = [key, ...this.cacheKeys];
    }

    return item;
  }

  has(key: string): boolean {
    const item: void | T = this.cache[key];
    return item !== undefined;
  }

  delete(key: string) {
    this.cacheKeys = this.cacheKeys.filter((k) => k !== key);
    delete this.cache[key];
  }

  clear() {
    this.cache = {};
    this.cacheKeys = [];
  }

  size(): number {
    return this.cacheKeys.length;
  }

  keys(): string[] {
    return this.cacheKeys;
  }

  values(): T[] {
    return Object.values(this.cache);
  }
}


