import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Todo } from '../todo.model';

export class CreateTodoDto implements Omit<Todo, 'id'> {
  @ApiProperty({})
  @IsString()
  completed: boolean;

  @ApiProperty({})
  @IsString()
  text: string;
}
