import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, 'Title cannot be empty')
    .max(255, 'Title must be less than 255 characters')
    .trim(),
});


export const updateTodoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title cannot be empty')
    .max(255, 'Title must be less than 255 characters')
    .trim()
    .optional(),
  completed: z
    .boolean({ invalid_type_error: 'Completed must be a boolean' })
    .optional(),
}).refine(
  (data) => data.title !== undefined || data.completed !== undefined,
  {
    message: 'At least one field (title or completed) must be provided',
    path: ['title'], 
  }
);

export const todoParamsSchema = z.object({
  id: z
    .string({ required_error: 'ID is required' })
    .regex(/^\d+$/, 'ID must be a valid number')
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, 'ID must be greater than 0'),
});


export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type TodoParams = z.infer<typeof todoParamsSchema>;