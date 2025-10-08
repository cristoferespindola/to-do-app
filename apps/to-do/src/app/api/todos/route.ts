import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch('http://localhost:3001/api/todos');
  const todos = await response.json();
  return NextResponse.json(todos);
}
