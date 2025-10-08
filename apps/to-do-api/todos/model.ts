import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../db.js';
import { TToDo } from '@to-do/shared';

type TodoCreationAttributes = Optional<TToDo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>;

export const Todo = db.define<Model<TToDo, TodoCreationAttributes>>('Todo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default Todo;
