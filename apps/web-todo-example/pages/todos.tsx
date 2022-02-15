import { FC, useState } from 'react';
import {
  useTodosControllerList,
  useTodosControllerUpdateTodo,
  useTodosControllerDeleteTodo,
  Todo,
  useTodosControllerCreateTodo,
} from '~/api/client';

export const TodosPage: FC = () => {
  const todosHook = useTodosControllerList();
  const todos = todosHook.data?.data || [];

  const updateTodoHook = useTodosControllerUpdateTodo();
  const toggleComplete = (todo: Todo) => async () => {
    await updateTodoHook.mutateAsync({
      id: todo.id,
      data: { completed: !todo.completed },
    });
    await todosHook.refetch();
  };

  const deleteTodoHook = useTodosControllerDeleteTodo();
  const deleteTodo = (todo: Todo) => async () => {
    await deleteTodoHook.mutateAsync({
      id: todo.id,
    });
    await todosHook.refetch();
  };

  const [newTodo, setNewTodo] = useState('');
  const createTodoHook = useTodosControllerCreateTodo();
  const createTodo = async () => {
    await createTodoHook.mutateAsync({
      data: { completed: false, text: newTodo },
    });

    await todosHook.refetch();
    setNewTodo('');
  };

  return (
    <div>
      <h2>Todos page</h2>
      <form>
        <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={createTodo}>Create Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h3
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </h3>
            <button onClick={toggleComplete(todo)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={deleteTodo(todo)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosPage;
