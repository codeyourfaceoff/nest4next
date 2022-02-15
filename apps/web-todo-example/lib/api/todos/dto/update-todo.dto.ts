import { ApiPropertyOptional } from '@nestjs/swagger';
import { Todo } from '../todo.model';

export class UpdateTodoDto implements Omit<Todo, 'id'> {
  @ApiPropertyOptional()
  completed: boolean;

  @ApiPropertyOptional()
  text: string;
}
