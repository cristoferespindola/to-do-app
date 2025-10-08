import express, { Request, Response } from 'express';
import Todo from './model';
import createRateLimiter from '../../helpers/limiter';
import { 
  validateData, 
  validateParams, 
  validateMultiple 
} from '../../middleware/validationMiddleware';
import { 
  createTodoSchema, 
  updateTodoSchema, 
  todoParamsSchema,
  type CreateTodoInput,
  type UpdateTodoInput,
  type TodoParams
} from '../../schemas/todos';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.use(createRateLimiter());

router.get('/todos', async (req: Request, res: Response) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

router.post('/todos', validateData(createTodoSchema), async (req: Request, res: Response) => {
  const { title } = req.validated!.body as CreateTodoInput;

  const todo = await Todo.create({ title });

  res.status(StatusCodes.CREATED).json(todo);
});

router.put('/todos/:id', validateMultiple([
  { schema: todoParamsSchema, target: 'params' },
  { schema: updateTodoSchema, target: 'body' }
]), async (req: Request, res: Response) => {
  const { id } = req.validated!.params as TodoParams;
  const body = req.validated!.body as UpdateTodoInput;

  const todo = await Todo.findByPk(id);

  if (!todo) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Todo not found' });
  }

  await todo.update(body);

  res.json(todo);
});

router.delete('/todos/:id', validateParams(todoParamsSchema), async (req: Request, res: Response) => {
  const { id } = req.validated!.params as TodoParams;
  
  const todo = await Todo.findByPk(id);

  if (!todo) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Todo not found' });
  }

  await todo.destroy();
  res.json({ message: 'Todo deleted successfully' });
});

export default router;
