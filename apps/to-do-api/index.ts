import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import seed from './helpers/seed';
import todosRouter from './todos/routes';

const app = express();
const port = 3001;

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use('/api', todosRouter);

seed();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
