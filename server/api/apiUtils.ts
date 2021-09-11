import * as jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';
import { Request, Response, NextFunction } from 'express';
import { formatError } from '../../shared/utils/baseUtils';
import { badRequestException, unauthorizedException } from './apiExceptions';
import { isStrictStringOrThrow } from '../../shared/utils/typeUtils';
import config from '../../shared/config/serverConfig';

export function createUserSession(req: Request, userId: string) {
  // @ts-ignore
  req.session.userId = userId;
}

export function destroyUserSession(req: Request) {
  // @ts-ignore
  req.session.destroy();
}

type JwtPayload = {
  sub: string;
  iss: string;
  aud: string;
  iat: number;
  exp?: number;
};

export function createUserToken(userId: string, utcTimestamp: number) {
  const oneDay = 1000 * 60 * 60 * 24;
  const expiresIn = oneDay * 5;

  const { jwtSecret, issuer, audience } = config.auth;

  const payload: JwtPayload = {
    sub: userId,
    iss: issuer,
    aud: audience,
    iat: utcTimestamp,
  };

  const token = jwt.sign(payload, jwtSecret, {
    expiresIn,
  });
  return token;
}

export function getUserToken(req: Request): null | string {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const tokenMaybe = req.headers.authorization.split(' ')[1];
    return tokenMaybe || null;
  }
  return null;
}

function verifyUserTokenAndSession(req: Request, res: Response) {
  const token = getUserToken(req);
  if (!token) return unauthorizedException(res, 'No token');

  const session = req.session;
  if (!session) return unauthorizedException(res, 'No session');

  // @ts-ignore
  const userId = isStrictStringOrThrow(session.userId, 'No user session');

  try {
    const { jwtSecret, issuer, audience } = config.auth;
    const verified: JwtPayload = jwt.verify(token, jwtSecret) as any;

    if (verified.sub !== userId || verified.iss !== issuer || verified.aud !== audience) {
      return unauthorizedException(res, 'Token verification failed');
    }

    if (!verified.exp || DateTime.now().toMillis() > verified.exp) {
      destroyUserSession(req);
      return unauthorizedException(res, 'Token expired');
    }
  } catch (e) {
    destroyUserSession(req);
    return unauthorizedException(res, 'Invalid token');
  }

  // @ts-ignore
  req.userId = userId;
}

const publicRoutes: { [k: string]: true } = {
  '/api/v1/users/register': true,
  '/api/v1/users/login': true,
  '/api/v1/users/logout': true,
};

type ExpressRouteFn = (_req: Request, _res: Response, _next: NextFunction) => any;

export function handleRequest(route: ExpressRouteFn): ExpressRouteFn {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isPrivateRoute = Boolean(!publicRoutes[req.route.path]);
      if (isPrivateRoute) verifyUserTokenAndSession(req, res);
      await route(req, res, next);
    } catch (e) {
      if (res.headersSent) return next(e);
      return badRequestException(res, formatError(e));
    }
  };
}

// export function setUserTokenAsCookie(res: Response, token: string) {
//   res.cookie('usertoken', token, {
//     expires: new Date(Date.now() + auth.expiresIn),
//     httpOnly: true,
//     // sameSite: true,
//   });
// }
