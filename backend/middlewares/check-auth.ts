import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IGetUserRequest } from '../definition-file';
import { User } from '../models/user';

interface IJwtPayload {
  userId: string;
}

const checkAuth = async (req: IGetUserRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as IJwtPayload;
      req.user = await User.findById(userId);
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

export { checkAuth };
