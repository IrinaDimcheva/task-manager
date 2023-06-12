import express from 'express';
import { authenticate } from '../middlewares/auth';
import { getCurrentUser } from '../controllers/userController';

const router = express.Router();

router.get('/currentuser', authenticate, getCurrentUser);

export default router;
