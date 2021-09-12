import {
  xferInit,
  xferRequest,
  xferSuccess,
  xferFailure,
  hasXferInited,
  hasXferRequested,
  hasXferSucceeded,
  hasXferFailed,
} from './asyncUtils';

const resInit = {
  requested: false,
  succeeded: false,
  failed: false,
  error: undefined,
};

const resRequest = {
  requested: true,
  succeeded: false,
  failed: false,
  error: undefined,
};

const resSuccess = {
  requested: false,
  succeeded: true,
  failed: false,
  error: undefined,
};

const resFailure = {
  requested: false,
  succeeded: false,
  failed: true,
};

describe('asyncUtils', () => {
  test('xfers', () => {
    expect(xferInit()).toEqual(resInit);
    expect(xferRequest()).toEqual(resRequest);
    expect(xferSuccess()).toEqual(resSuccess);
    expect(xferFailure()).toEqual(resFailure);

    const errorMsg = 'some error message';
    const errorObj = new Error(errorMsg);

    expect(xferFailure(errorMsg)).toEqual({
      ...resFailure,
      error: errorMsg,
    });

    expect(xferFailure(errorObj)).toEqual({
      ...resFailure,
      error: 'some error message',
    });
  });

  test('hasXfers', () => {
    expect(hasXferInited(resInit)).toEqual(true); // <-- TRUE
    expect(hasXferInited(resRequest)).toEqual(false);
    expect(hasXferInited(resSuccess)).toEqual(false);
    expect(hasXferInited(resFailure)).toEqual(false);

    expect(hasXferRequested(resInit)).toEqual(false);
    expect(hasXferRequested(resRequest)).toEqual(true); // <-- TRUE
    expect(hasXferRequested(resSuccess)).toEqual(false);
    expect(hasXferRequested(resFailure)).toEqual(false);

    expect(hasXferSucceeded(resInit)).toEqual(false);
    expect(hasXferSucceeded(resRequest)).toEqual(false);
    expect(hasXferSucceeded(resSuccess)).toEqual(true); // <-- TRUE
    expect(hasXferSucceeded(resFailure)).toEqual(false);

    expect(hasXferFailed(resInit)).toEqual(false);
    expect(hasXferFailed(resRequest)).toEqual(false);
    expect(hasXferFailed(resSuccess)).toEqual(false);
    expect(hasXferFailed(resFailure)).toEqual(true); // <-- TRUE
  });
});


