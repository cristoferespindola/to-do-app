'use client';

import { useState, useOptimistic, startTransition } from 'react';
import { TToDo } from '@to-do/shared';
import { TodoItem } from './TodoItem';
import { deleteTodo, toggleTodo } from '@/services/todos';

type TodoListProps = {
  initialTodos: TToDo[];
};

export function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<TToDo[]>(initialTodos);
  const [optimisticTodos, updateOptimisticTodos] = useOptimistic(
    todos,
    (
      state,
      {
        action,
        todoId,
        updates,
      }: {
        action: 'toggle' | 'delete';
        todoId: number;
        updates?: Partial<TToDo>;
      }
    ) => {
      if (action === 'delete') {
        return state.filter(todo => todo.id !== todoId);
      }
      return state.map(todo => (todo.id === todoId ? { ...todo, ...updates } : todo));
    }
  );

  const handleToggle = async (id: number, completed: boolean) => {
    startTransition(() => {
      updateOptimisticTodos({ action: 'toggle', todoId: id, updates: { completed } });
    });

    try {
      const updatedTodo = await toggleTodo(id, completed);

      setTodos(prev => prev.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      setTodos([...todos]);
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    startTransition(() => {
      updateOptimisticTodos({ action: 'delete', todoId: id });
    });

    try {
      await deleteTodo(id);

      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      setTodos([...todos]);
      throw error;
    }
  };

  const stats = {
    total: optimisticTodos.length,
    completed: optimisticTodos.filter(todo => todo.completed).length,
    pending: optimisticTodos.filter(todo => !todo.completed).length,
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">My Todo List</h1>
        <p className="text-white">Keep track of your daily tasks</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-blue-800">Total</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-green-800">Completed</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
          <div className="text-sm text-orange-800">Pending</div>
        </div>
      </div>

      <div className="space-y-2">
        {optimisticTodos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No todos yet</div>
            <p className="text-gray-500 text-sm">Create your first todo to get started</p>
          </div>
        ) : (
          optimisticTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}
