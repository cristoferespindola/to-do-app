export const ROUTE = 'http://localhost:3001/api/todos';

export const getTodos = async () => {
  const response = await fetch(ROUTE);
  const todos = await response.json();
  if (!response.ok) throw new Error('Failed to get todos');

  return todos;
};

export const toggleTodo = async (id: number, completed: boolean) => {
  const response = await fetch(`${ROUTE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  });
  
  if (!response.ok) throw new Error('Failed to update todo');
  
  const updatedTodo = await response.json();
  
  return updatedTodo;
};

export const deleteTodo = async (id: number) => {
  const response = await fetch(`${ROUTE}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Failed to delete todo');

  return response.json();
};