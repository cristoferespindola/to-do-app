export type TToDo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TToDoCreate = Omit<TToDo, 'id' | 'createdAt' | 'updatedAt'> & {
  completed?: boolean;
};

export type TToDoUpdate = Partial<TToDoCreate>;
