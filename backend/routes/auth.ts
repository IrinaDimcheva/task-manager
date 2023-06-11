import express from 'express';
import { requireAuth } from '../middlewares/require-auth';
import {
  register,
  login,
  logout
} from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', requireAuth, logout);

export default router;
