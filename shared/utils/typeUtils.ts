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
  const match = lowered.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i);
  if (!match) throw new Error(msg);
  return lowered;
}

type PasswordValidation = {
  [k: string]: [string, boolean];
};

export function getValidPassword(password: string): PasswordValidation {
  const errors: PasswordValidation = {
    minMaxLength: ['must be between 8 and 32 characters', false],
    lowerCase: ['Must have at least one Lowercase letter', false],
    upperCase: ['Must have at least one uppercase letter', false],
    hasNumber: ['Must have at least one number', false],
    hasSpecial: ['Must have at least one special character', false],
  };

  if (password.length < 8 || password.length > 32) {
    errors.minMaxLength = [errors.minMaxLength[0], true];
  }

  if (password.toUpperCase() === password) {
    errors.lowerCase = [errors.lowerCase[0], true];
  }

  if (password.toLowerCase() === password) {
    errors.upperCase = [errors.upperCase[0], true];
  }

  if (!/\d/.test(password)) {
    errors.hasNumber = [errors.hasNumber[0], true];
  }

  //   if (/[!#$%^&*+=-;,.{}]/.test(password)) {
  //     errors.hasSpecial = [errors.hasSpecial[0], true];
  //   }

  return errors;
}

export function isValidEmailOrThrow(value: string, msg: string): string {
  const str = isStrictStringOrThrow(value, msg);
  return isValidEmail(str, msg);
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



