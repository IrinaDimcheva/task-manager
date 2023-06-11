import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db';
import { notFound, errorHandler } from './middlewares/error-handler';
import authRoutes from './routes/auth';

const port = process.env.PORT || 5000;

connectDB();
const app: Express = express();

app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
