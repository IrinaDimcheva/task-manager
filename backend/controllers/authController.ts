import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/jwt';
import { User } from '../models/user';

const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(409);
    throw new Error('User already exists');
  }

  const user = User.build({ name, email, password });
  await user.save();

  if (!user) {
    res.status(400);
    throw new Error('Invalid user data');
  }

  generateToken(res, user._id);
  res.status(201).send(user);
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).send(user);
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({ message: 'Logged out' });
});

export {
  register,
  login,
  logout
};
