import { Response } from 'express';

type Exception = {
  status: number;
  name: string;
  message?: string;
};

type ExceptionMap = {
  [k: string]: Exception,
};

const EXCEPTIONS: ExceptionMap = {
  badRequestException: {
    status: 400,
    name: 'Bad Request',
  },
  unauthorizedException: {
    status: 401,
    name: 'Uauthorized',
  },
  forbiddenException: {
    status: 403,
    name: 'Forbidden',
  },
  notFoundException: {
    status: 404,
    name: 'Not Found',
  },
  conflictException: {
    status: 409,
    name: 'Conflict',
  },
  internalServerErrorException: {
    status: 500,
    name: 'Internal Server Error',
  },
};

function baseException(res: Response, exception: Exception, messageMaybe: string): Response {
  const { status, name } = exception;
  const message = messageMaybe || exception.name;
  const error: Exception = {
    status,
    name,
    message,
  };
  return res.status(error.status).send(error);
}

export function badRequestException(res: Response, messageMaybe?: string) {
  return baseException(res, EXCEPTIONS.badRequestException, messageMaybe);
}

export function unauthorizedException(res: Response, messageMaybe?: string) {
  return baseException(res, EXCEPTIONS.unauthorizedException, messageMaybe);
}

export function forbiddenException(res: Response, messageMaybe?: string) {
  return baseException(res, EXCEPTIONS.forbiddenException, messageMaybe);
}

export function notFoundException(res: Response, messageMaybe?: string) {
  return baseException(res, EXCEPTIONS.notFoundException, messageMaybe);
}

export function conflictException(res: Response, messageMaybe?: string) {
  return baseException(res, EXCEPTIONS.conflictException, messageMaybe);
}

export function internalServerErrorException(res: Response, messageMaybe?: string) {
  return baseException(res, EXCEPTIONS.internalServerErrorException, messageMaybe);
}


