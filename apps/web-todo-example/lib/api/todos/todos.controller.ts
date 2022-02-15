import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Todo } from './todo.model';

@Controller('todos')
export class TodosController {
  @Get()
  @ApiOperation({ summary: 'List all todos' })
  @ApiResponse({ type: () => Todo, isArray: true, status: 200 })
  async list(): Promise<Todo[]> {
    return [
      {
        id: '1',
        text: 'hello world',
        completed: false,
      },
    ];
  }
}
