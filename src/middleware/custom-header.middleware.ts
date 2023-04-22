import { Request, Response, NextFunction } from 'express';

export function customHeaderMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.setHeader('X-App-Version', '1.0.0');
  next();
}
