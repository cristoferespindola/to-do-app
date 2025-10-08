import express, { Request, Response } from 'express';
import Todo from './model';
import rateLimit from 'express-rate-limit';


const router = express.Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
});

router.use(limiter);

router.get('/todos', async (req: Request, res: Response) => {
    const todos = await Todo.findAll();
    res.json(todos);
});

router.post('/todos', async (req: Request, res: Response) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const todo = await Todo.create({ title });
    res.json(todo);
});

router.put('/todos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title } = req.body;

    const todo = await Todo.findByPk(id);
    res.json(todo);

    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    await todo.update({ title });
    await todo.save();

    res.json(todo);
});

router.delete('/todos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    res.json(todo);

    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    await todo.destroy();
    res.json({ message: 'Todo deleted' });
});

export default router;