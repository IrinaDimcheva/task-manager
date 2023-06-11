import { Response } from 'express';
import { ObjectId } from 'mongoose';
import jwt from 'jsonwebtoken';

const generateToken = (res: Response, userId: ObjectId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '2h'
  });

  res.cookie('jwt', token, {
    maxAge: 2 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict'
  });
}

export default generateToken;
