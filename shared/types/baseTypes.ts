export type Maybe<T> = null | void | T;

export type SimpleDate = {
  days: number,
  months: number,
  years: number,
};

export type RelativeRange = {
  start: SimpleDate;
  stop: null | SimpleDate;
};

export type AbsoluteRange = {
  start: number;
  stop: null | number;
};


