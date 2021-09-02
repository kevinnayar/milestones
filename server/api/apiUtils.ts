import { Request, Response, NextFunction } from 'express';
import { formatError } from '../../shared/utils/baseUtils';

function handleCatch(res: Response, e: any): void {
  const error = formatError(e);
  const code = e.code || 400;
  res.status(code).send({ error });
}

type ExpressRouteFn = (_req: Request, _res: Response, _next: NextFunction) => any;

export function handleRequest(route: ExpressRouteFn): ExpressRouteFn {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await route(req, res, next);
    } catch (e) {
      handleCatch(res, e);
    }
  };
}
