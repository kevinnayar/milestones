import { Maybe, SimpleDate } from '../types/baseTypes';

export function isStringOrThrow(value: any, msg: string): string {
  if (typeof value !== 'string') throw new Error(msg);
  return value;
}

export function isStrictStringOrThrow(value: any, msg: string): string {
  const str = isStringOrThrow(value, msg);
  if (!str) throw new Error(msg);
  return str;
}

export function isStrictStringNullOrThrow(value: any, msg: string): null | string {
  if (typeof value === 'string' && value) return value;
  if (value === null) return null;
  throw new Error(msg);
}

export function isStrictStringNullVoidOrThrow(value: any, msg: string): Maybe<string> {
  if (value === undefined) return undefined;
  return isStrictStringNullOrThrow(value, msg);
}

export function inStringUnionOrThrow<U extends string>(value: string, unionList: U[], msg: string): U {
  if (!unionList.includes(value as any)) throw new Error(msg);
  const str: U = value as any;
  return str;
}

export function isValidEmail(value: string, msg: string): string {
  // https://html.spec.whatwg.org/multipage/input.html#e-mail-state-(type=email)
  const lowered = value.toLowerCase();
  const match = lowered.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i);
  if (!match) throw new Error(msg);
  return lowered;
}

export function isValidEmailOrThrow(value: string, msg: string): string {
  const str = isStrictStringOrThrow(value, msg);
  return isValidEmail(str, msg);
}

export function isNumberOrThrow(value: any, message: string): number {
  if (typeof value === 'number' && !Number.isNaN(value) && value <= Number.MAX_SAFE_INTEGER) return value;
  throw new Error(message);
}

export function isNumberInRangeOrThrow(value: any, rangeMin: number, rangeMax: number, msg: string): number {
  const num: number = isNumberOrThrow(value, msg);
  if (num < rangeMin) throw new Error(`${msg} - below min range`);
  if (num > rangeMax) throw new Error(`${msg} - above max range`);
  return num;
}

export function isSimpleDateOrThrow(value: any, msg: string): SimpleDate {
  if (value.day === undefined) throw new Error(`${msg} - day not defined`);
  if (value.month === undefined) throw new Error(`${msg} - month not defined`);
  if (value.year === undefined) throw new Error(`${msg} - year not defined`);

  const day = isNumberInRangeOrThrow(value.day, 0, 31, `${msg} - day`);
  const month = isNumberInRangeOrThrow(value.month, 0, 12, `${msg} - month`);
  const year = isNumberInRangeOrThrow(value.year, 0, 5000, `${msg} - year`);

  return {
    day,
    month,
    year,
  };
}

