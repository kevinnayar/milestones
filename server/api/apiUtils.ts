import { Request, Response, NextFunction } from 'express';
import * as jwt from 'express-jwt';
import * as jwks from 'jwks-rsa';
import config from '../../shared/config/serverConfig';
import { formatError } from '../../shared/utils/baseUtils';

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
  console.log('-- here --');
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

const { audience, issuer } = config.auth;

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuer}.well-known/jwks.json`,
  }),
  audience,
  issuer,
  algorithms: ['RS256'],
});

const publicRoutes: { [k: string]: true } = {
  '/api/v1/users/create': true,
};

type ExpressRouteFn = (_req: Request, _res: Response, _next: NextFunction) => any;

export function handleRequest(route: ExpressRouteFn): ExpressRouteFn {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isPublic = Boolean(publicRoutes[req.route.path]);
      if (!isPublic) jwtCheck(req, res, next);
      await route(req, res, next);
    } catch (e) {
      if (res.headersSent) {
        e.statusCode = 500;
        return next(e);
      }
      return badRequestException(res, e);
    }
  };
}











