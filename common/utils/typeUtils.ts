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

export function isMaybeStringOrThrow(value: any, msg: string): Maybe<string> {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value === 'string') return value;
  throw new Error(msg);
}

export function inStringUnionOrThrow<U extends string>(value: string, unionList: U[], msg: string): U {
  if (!unionList.includes(value as any)) throw new Error(msg);
  const str: U = value as any;
  return str;
}

export function isValidEmail(value: string, msg: string): string {
  // https://html.spec.whatwg.org/multipage/input.html#e-mail-state-(type=email)
  const lowered = value.toLowerCase();
  const match = lowered.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i);
  if (!match) throw new Error(msg);
  return lowered;
}

export function isValidEmailOrThrow(value: string, msg: string): string {
  const str = isStrictStringOrThrow(value, msg);
  return isValidEmail(str, msg);
}

type PasswordValidation = [string, boolean];

export function getValidPassword(password: string): PasswordValidation[] {
  const errors: PasswordValidation[] = [
    ['between 8 and 32 characters', false],
    ['have at least one lowercase letter', false],
    ['have at least one uppercase letter', false],
    ['have at least one number', false],
    ['have at least one special character', false],
  ];

  if (password.length < 8 || password.length > 32) errors[0][1] = true;
  if (password.toUpperCase() === password) errors[1][1] = true;
  if (password.toLowerCase() === password) errors[2][1] = true;
  if (!/\d/.test(password)) errors[3][1] = true;

  //   if (/[!#$%^&*+=-;,.{}]/.test(password)) {
  //     errors.hasSpecial = [errors.hasSpecial[0], true];
  //   }

  return errors;
}

export function isValidPasswordOrThrow(password: string): string {
  const errorStates = getValidPassword(password);
  const errors = [];
  for (const [err, isErr] of errorStates) {
    if (isErr) {
      errors.push(err);
    }
  }
  const error = errors.length ? `Password must ${errors.join('. ')}.` : null;
  if (error) throw new Error(error);
  return password;
}

export function isNumberOrThrow(value: any, message: string): number {
  if (typeof value === 'number' && !Number.isNaN(value) && value <= Number.MAX_SAFE_INTEGER) {
    return value;
  }
  throw new Error(message);
}

export function isNumberInRangeOrThrow(value: any, rangeMin: number, rangeMax: number, msg: string): number {
  const num: number = isNumberOrThrow(value, msg);
  if (num < rangeMin) throw new Error(`${msg} - below min range`);
  if (num > rangeMax) throw new Error(`${msg} - above max range`);
  return num;
}

export function isDefinedOrThrow(value: any, msg: string) {
  if (value === undefined) throw new Error(msg);
  return value;
}

export function isSimpleDateOrThrow(value: any, msg: string): SimpleDate {
  if (value.days === undefined) throw new Error(`${msg} - day not defined`);
  if (value.months === undefined) throw new Error(`${msg} - month not defined`);
  if (value.years === undefined) throw new Error(`${msg} - year not defined`);
  return value;
}

export function isAbsoluteDateOrThrow(value: any, msg: string): SimpleDate {
  const date: SimpleDate = isSimpleDateOrThrow(value, msg);
  const days = isNumberInRangeOrThrow(date.days, 1, 31, `${msg} - day`);
  const months = isNumberInRangeOrThrow(date.months, 1, 12, `${msg} - month`);
  const years = isNumberInRangeOrThrow(date.years, 1, 5000, `${msg} - year`);
  return {
    days,
    months,
    years,
  };
}

export function isRelativeDateOrThrow(value: any, msg: string): SimpleDate {
  const date: SimpleDate = isSimpleDateOrThrow(value, msg);
  const days = isNumberInRangeOrThrow(date.days, 0, 31, `${msg} - day`);
  const months = isNumberInRangeOrThrow(date.months, 0, 12, `${msg} - month`);
  const years = isNumberInRangeOrThrow(date.years, 0, 5000, `${msg} - year`);
  return {
    days,
    months,
    years,
  };
}

type DateObject = {
  year: number;
  month: number;
  day: number;
};

export function simpleDateToDateObject(d: SimpleDate): DateObject {
  return {
    year: d.years,
    month: d.months,
    day: d.days,
  };
}




