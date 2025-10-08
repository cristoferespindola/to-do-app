import { TToDo } from '@to-do/shared';
import { PageContainer } from '@/components/PageContainer';
import { TodoList } from '@/components/TodoList';

export default async function Home() {
  const response = await fetch('http://localhost:3001/api/todos', {
    cache: 'no-store', // Always fetch fresh data
  });
  const todos = (await response.json()) as TToDo[];

  return (
    <PageContainer title="Home - Todo List" path="/">
      <TodoList initialTodos={todos} />
    </PageContainer>
  );
}
