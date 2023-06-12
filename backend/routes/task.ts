import express from 'express';
import { createTask, getAllTasks, updateTask, deleteTask } from '../controllers/taskController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.post('/new', authenticate, createTask);
router.get('/', authenticate, getAllTasks);
router.put('/edit/:id', authenticate, updateTask);
router.delete('/:id', authenticate, deleteTask);

export default router;
