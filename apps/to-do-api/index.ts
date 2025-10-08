import 'dotenv/config';
import express, { Request, Response } from 'express';
import seed from './helpers/seed';
import todosRouter from './todos/routes';

const app = express();
const port = 3001;

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