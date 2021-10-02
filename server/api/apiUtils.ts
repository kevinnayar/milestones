import * as jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';
import { Request, Response, NextFunction } from 'express';

import config from '../serverConfig';
import { formatError } from '../../common/utils/baseUtils';
import { badRequestException, unauthorizedException } from './apiExceptions';
import { ServiceHandlerOpts } from '../serverTypes';

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
  const expiresIn = minute * 10; // 10 minutes
  const refreshExpiresIn = minute * 60 * 24 * 7; // 7 days

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

export function verifyUserTokenAndSession(res: Response, token: string): string {
  try {
    const { jwtSecret, issuer, audience } = config.auth;
    const verified: JwtPayload = jwt.verify(token, jwtSecret) as any;

    if (verified.iss !== issuer || verified.aud !== audience) {
      unauthorizedException(res, 'Token verification failed');
    }

    if (!verified.exp || DateTime.now().toMillis() > verified.exp) {
      unauthorizedException(res, 'Token expired');
    }

    return verified.sub;
  } catch (e) {
    unauthorizedException(res, 'Invalid token');
  }
}

type ExpressRouteFn = (_req: Request, _res: Response, _next: NextFunction) => any;

export function handleRequest(route: ExpressRouteFn, opts: ServiceHandlerOpts): ExpressRouteFn {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const publicRoutes: { [k: string]: true } = {
        '/api/v1/users/register': true,
        '/api/v1/users/login': true,
        '/api/v1/users/logout': true,
        '/api/v1/users/refresh-token': true,
      };
      const isPrivateRoute = Boolean(!publicRoutes[req.route.path]);

      if (isPrivateRoute) {
        const token = getUserToken(req);
        if (!token) return unauthorizedException(res, 'No token');

        const userId = verifyUserTokenAndSession(res, token);
        req.body = {
          ...req.body,
          userId,
        };
      }

      opts.logger.logRequest(req);

      await route(req, res, next);
    } catch (e) {
      opts.logger.logRequest(req);
      if (res.headersSent) return next(e);
      return badRequestException(res, formatError(e));
    }
  };
}



