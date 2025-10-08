'use client';

import { useState } from 'react';
import { TToDo } from '@to-do/shared';
import { useAnalytics, CustomEvent } from '@to-do/analytics';

type TodoItemProps = {
  todo: TToDo;
  onToggle: (id: number, completed: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { trackEvent } = useAnalytics();

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await onToggle(todo.id, !todo.completed);
      trackEvent(CustomEvent.TODO_COMPLETED, {
        todo_id: todo.id,
        completed: !todo.completed,
      });
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete(todo.id);
      trackEvent(CustomEvent.TODO_DELETED, {
        todo_id: todo.id,
      });
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="group flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`
          flex items-center justify-center w-5 h-5 rounded border-2 transition-all
          ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-green-500'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <span
        className={`
          flex-1 text-gray-800 transition-all
          ${todo.completed ? 'line-through text-gray-400' : ''}
        `}
      >
        {todo.title}
      </span>

      <button
        onClick={handleDelete}
        disabled={isLoading}
        className={`
          opacity-0 group-hover:opacity-100 transition-opacity
          px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 
          rounded-md font-medium
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        aria-label="Delete todo"
      >
        Delete
      </button>
    </div>
  );
}
