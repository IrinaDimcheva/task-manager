import { Request } from 'express';
import { IUserModel } from './models/user';

export interface IGetUserRequest extends Request {
  user: IUserModel | null;
}
