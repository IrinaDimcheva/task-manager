import express from 'express';
import { createTask } from '../controllers/taskController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.post('/new', authenticate, createTask);

export default router;
