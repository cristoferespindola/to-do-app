import Todo from '../todos/model';

const seed = async () => {
  await Todo.sync({ force: true });
  await Todo.create({ title: 'Buy groceries' });
  await Todo.create({ title: 'Finish the project' });
  await Todo.create({ title: 'Call the doctor' });
};

export default seed;