import { Response } from 'express';

const STATUS_CODES = {
  badRequestException: 400,
  unauthorizedException: 401,
  forbiddenException: 403,
  notFoundException: 404,
  conflictException: 409,
  internalServerErrorException: 500,
};

function baseException(statusCode: number, res: Response, error: string): Response {
  return res.status(statusCode).json({ error });
}

export function badRequestException(res: Response, error: string) {
  return baseException(STATUS_CODES.badRequestException, res, error);
}

export function unauthorizedException(res: Response, error: string) {
  return baseException(STATUS_CODES.unauthorizedException, res, error);
}

export function forbiddenException(res: Response, error: string) {
  return baseException(STATUS_CODES.forbiddenException, res, error);
}

export function notFoundException(res: Response, error: string) {
  return baseException(STATUS_CODES.notFoundException, res, error);
}

export function conflictException(res: Response, error: string) {
  return baseException(STATUS_CODES.conflictException, res, error);
}

export function internalServerErrorException(res: Response, error: string) {
  return baseException(STATUS_CODES.internalServerErrorException, res, error);
}

