import { Request, Response, NextFunction } from 'express';
import { MongooseError } from 'mongoose';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 400 : res.statusCode;
  let message = err.message;

  if (err.name === 'CastError' && (err as MongooseError | any).kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
}

export { notFound, errorHandler };
