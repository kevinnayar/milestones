import {
  fetchInit,
  fetchRequest,
  fetchSuccess,
  fetchFailure,
  hasFetchNotStarted,
  hasFetchRequested,
  hasFetchSucceeded,
  hasFetchFailed,
} from './asyncUtils';

const resInit = {
  loading: false,
  data: null,
  error: null,
};

const resRequest = {
  loading: true,
  data: null,
  error: null,
};

const resSuccess = {
  loading: false,
  data: { foo: 'bar' },
  error: null,
};

const resFailure = {
  loading: false,
  data: null,
  error: 'Could not fetch data',
};

describe('asyncUtils', () => {
  test('fetches', () => {
    expect(fetchInit()).toEqual(resInit);
    expect(fetchRequest()).toEqual(resRequest);
    expect(fetchSuccess({ foo: 'bar' })).toEqual(resSuccess);
    expect(fetchFailure()).toEqual(resFailure);

    const error = 'some error message';
    const errorObj = new Error(error);

    expect(fetchFailure(error)).toEqual({
      ...resFailure,
      error,
    });

    expect(fetchFailure(errorObj)).toEqual({
      ...resFailure,
      error,
    });
  });

  test('fetch validators', () => {
    expect(hasFetchNotStarted(resInit)).toEqual(true); // <-- TRUE
    expect(hasFetchNotStarted(resRequest)).toEqual(false);
    expect(hasFetchNotStarted(resSuccess)).toEqual(false);
    expect(hasFetchNotStarted(resFailure)).toEqual(false);

    expect(hasFetchRequested(resInit)).toEqual(false);
    expect(hasFetchRequested(resRequest)).toEqual(true); // <-- TRUE
    expect(hasFetchRequested(resSuccess)).toEqual(false);
    expect(hasFetchRequested(resFailure)).toEqual(false);

    expect(hasFetchSucceeded(resInit)).toEqual(false);
    expect(hasFetchSucceeded(resRequest)).toEqual(false);
    expect(hasFetchSucceeded(resSuccess)).toEqual(true); // <-- TRUE
    expect(hasFetchSucceeded(resFailure)).toEqual(false);

    expect(hasFetchFailed(resInit)).toEqual(false);
    expect(hasFetchFailed(resRequest)).toEqual(false);
    expect(hasFetchFailed(resSuccess)).toEqual(false);
    expect(hasFetchFailed(resFailure)).toEqual(true); // <-- TRUE
  });
});


