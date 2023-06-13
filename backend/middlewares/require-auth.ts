import { Request, Response, NextFunction } from 'express';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  next();
};
