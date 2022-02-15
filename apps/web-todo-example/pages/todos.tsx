import { FC } from 'react';
import { useTodosControllerList } from '~/api/client';

export const TodosPage: FC = () => {
  const { data } = useTodosControllerList();
  return (
    <div>
      <h2>Todos page</h2>
      <p>{JSON.stringify(data?.data)}</p>
    </div>
  );
};

export default TodosPage;
