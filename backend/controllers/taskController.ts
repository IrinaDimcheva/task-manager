import { NextFunction, Request, Response } from 'express';
import { Task } from '../models/task';
import { User } from '../models/user';

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description } = req.body;
  const userId = req.user!._id;

  try {
    const task = Task.build({
      title,
      description,
      userId
    });
    await task.save();
    await User.updateOne({ _id: userId }, { $push: { tasks: task._id } });

    res.status(201).send(task);
  } catch (err) {
    res.status(401);
    next(err);
  }
};

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await User.findById(req.user!._id).populate('tasks');
    res.status(200).send(data);
  } catch (err) {
    res.status(507);
    next(err);
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true
    });
    res.status(200).send(updatedTask);
  } catch (err) {
    res.status(401);
    next(err);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.user?._id;
  Promise.all([
    Task.findOneAndDelete({ _id: id, userId }),
    User.findOneAndUpdate({ _id: userId }, { $pull: { tasks: id } })
  ]).then(([deletedOne, _]) => {
    if (deletedOne) {
      res.status(200).send(deletedOne);
    } else {
      res.status(401).json({ message: 'Not allowed' })
    }
  }).catch(next);
};

export {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask
};
