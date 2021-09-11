import { Response } from 'express';

type StatusMap = {
  [k: string]: {
    code: number;
    name: string;
  };
};

const STATUSES: StatusMap = {
  badRequestException: {
    code: 400,
    name: 'Bad Request',
  },
  unauthorizedException: {
    code: 401,
    name: 'Uauthorized',
  },
  forbiddenException: {
    code: 403,
    name: 'Forbidden',
  },
  notFoundException: {
    code: 404,
    name: 'Not Found',
  },
  conflictException: {
    code: 409,
    name: 'Conflict',
  },
  internalServerErrorException: {
    code: 500,
    name: 'Internal Server Error',
  },
};

function baseException(statusCode: number, res: Response, error: string): Response {
  return res.status(statusCode).json({ error });
}

export function badRequestException(res: Response, errorMaybe?: string) {
  const { code, name } = STATUSES.badRequestException;
  const error = errorMaybe || name;
  return baseException(code, res, error);
}

export function unauthorizedException(res: Response, errorMaybe?: string) {
  const { code, name } = STATUSES.unauthorizedException;
  const error = errorMaybe || name;
  return baseException(code, res, error);
}

export function forbiddenException(res: Response, errorMaybe?: string) {
  const { code, name } = STATUSES.forbiddenException;
  const error = errorMaybe || name;
  return baseException(code, res, error);
}

export function notFoundException(res: Response, errorMaybe?: string) {
  const { code, name } = STATUSES.notFoundException;
  const error = errorMaybe || name;
  return baseException(code, res, error);
}

export function conflictException(res: Response, errorMaybe?: string) {
  const { code, name } = STATUSES.conflictException;
  const error = errorMaybe || name;
  return baseException(code, res, error);
}

export function internalServerErrorException(res: Response, errorMaybe?: string) {
  const { code, name } = STATUSES.internalServerErrorException;
  const error = errorMaybe || name;
  return baseException(code, res, error);
}


