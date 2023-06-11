import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

const authUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Auth user' });
});

const register = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Register' });
});

const login = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Login' });
});
const logout = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logout' });
});

export {
  authUser,
  register,
  login,
  logout
};
