import { Request, Response } from 'express';
import { Task } from '../models/task';

const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  console.log(req.user)

  const task = Task.build({
    title,
    description,
    userId: req.user!._id
  });
  await task.save();

  res.status(201).send(task);
}

export { createTask };
