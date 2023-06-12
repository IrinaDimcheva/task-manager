import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { User } from '../models/user';

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user);

  if (user) {
    res.status(200).send(user);
  }
});

export { getCurrentUser };
