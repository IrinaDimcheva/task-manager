import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db';
import { notFound, errorHandler } from './middlewares/error-handler';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import taskRoutes from './routes/task';

const port = process.env.PORT || 5000;

connectDB();
const app: Express = express();

app.use(express.json());

app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
