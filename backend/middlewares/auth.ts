import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      req.user = await User.findById(decodedToken.userId);
    } catch (err) {
      res.status(401);
      throw new Error('Not authorized. Invalid token');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized. Please login');
  }

  next();
};

export { authenticate };
