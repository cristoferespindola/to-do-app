import { TToDo } from '@to-do/shared';
import { PageContainer } from '@/components/PageContainer';

export default async function Home() {
  const response = await fetch('http://localhost:3001/api/todos');
  const todos = await response.json() as TToDo[];
  
  return (
    <PageContainer title="Home - Todo List" path="/">
      <div className="">
        {todos.map((todo: TToDo) => (
          <div key={todo.id}>{todo.title}</div>
        ))}
      </div>
    </PageContainer>
  );
}
