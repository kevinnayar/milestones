import * as jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';
import { Request, Response, NextFunction } from 'express';

import config from '../serverConfig';
import { formatError } from '../../shared/utils/baseUtils';
import { badRequestException, unauthorizedException } from './apiExceptions';
// import { isStrictStringOrThrow } from '../../shared/utils/typeUtils';

// export function createUserSession(req: Request, userId: string) {
//   // @ts-ignore
//   req.session.userId = userId;
//   console.log({ sessionOut: req.session });
// }

// export function destroyUserSession(req: Request) {
//   // @ts-ignore
//   req.session.destroy();
// }

type JwtPayload = {
  sub: string;
  iss: string;
  aud: string;
  iat: number;
  exp?: number;
};

type TokenResponse = {
  token: string;
  tokenExpiration: number;
  refreshToken: string;
  refreshTokenExpiration: number;
};

export function createUserToken(userId: string, utcTimestamp: number): TokenResponse {
  const { jwtSecret, issuer, audience } = config.auth;

  const payload: JwtPayload = {
    sub: userId,
    iss: issuer,
    aud: audience,
    iat: utcTimestamp,
  };

  const minute = 1000 * 60;
  const expiresIn = minute * 5;
  const refreshExpiresIn = minute * 10;

  const token = jwt.sign(payload, jwtSecret, {
    expiresIn,
  });

  const refreshToken = jwt.sign(payload, jwtSecret, {
    expiresIn: refreshExpiresIn,
  });

  return {
    token,
    tokenExpiration: expiresIn,
    refreshToken,
    refreshTokenExpiration: refreshExpiresIn,
  };
}

export function getUserToken(req: Request): null | string {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const tokenMaybe = req.headers.authorization.split(' ')[1];
    return tokenMaybe || null;
  }
  return null;
}

export function verifyUserTokenAndSession(res: Response, token: string) {
  // const session = req.session;
  // if (!session) return unauthorizedException(res, 'No session');

  // console.log({ sessionIn: session });

  // // @ts-ignore
  // const userId = isStrictStringOrThrow(session.userId, 'No user session');

  try {
    const { jwtSecret, issuer, audience } = config.auth;
    const verified: JwtPayload = jwt.verify(token, jwtSecret) as any;

    if (/* verified.sub !== userId || */verified.iss !== issuer || verified.aud !== audience) {
      return unauthorizedException(res, 'Token verification failed');
    }

    if (!verified.exp || DateTime.now().toMillis() > verified.exp) {
      return unauthorizedException(res, 'Token expired');
    }
  } catch (e) {
    return unauthorizedException(res, 'Invalid token');
  }
}

const publicRoutes: { [k: string]: true } = {
  '/api/v1/users/register': true,
  '/api/v1/users/login': true,
  '/api/v1/users/logout': true,
  '/api/v1/users/keep-alive': true,
};

type ExpressRouteFn = (_req: Request, _res: Response, _next: NextFunction) => any;

export function handleRequest(route: ExpressRouteFn): ExpressRouteFn {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isPrivateRoute = Boolean(!publicRoutes[req.route.path]);

      if (isPrivateRoute) {
        const token = getUserToken(req);
        if (!token) return unauthorizedException(res, 'No token');
        verifyUserTokenAndSession(res, token);
      }

      await route(req, res, next);
    } catch (e) {
      if (res.headersSent) return next(e);
      return badRequestException(res, formatError(e));
    }
  };
}



