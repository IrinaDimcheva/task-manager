import express from 'express';
import {
  authUser,
  register,
  login,
  logout
} from '../controllers/authController';

const router = express.Router();

router.post('/verify', authUser);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
