import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ensureFile } from 'fs-extra';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { CreateTodoDto, DeleteResponseDto, UpdateTodoDto } from './dto';
import { Todo } from './todo.model';

@Controller('todos')
export class TodosController {
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'List all todos' })
  @ApiResponse({ type: Todo, isArray: true, status: 200 })
  async list(): Promise<Todo[]> {
    return await this.load();
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ type: Todo })
  async createTodo(@Body() newTodo: CreateTodoDto) {
    const id = Date.now().toString();
    const todos = await this.load();
    todos.push({
      ...newTodo,
      id,
    });
    await this.save(todos);

    return await this.findById(id);
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get a singl a single todo' })
  @ApiResponse({ type: Todo })
  async getTodo(@Param('id') id: string) {
    return this.findById(id);
  }

  @Patch('/:id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiBody({
    type: UpdateTodoDto,
  })
  @ApiOperation({ summary: 'Update a new todo' })
  @ApiResponse({ type: Todo })
  @HttpCode(200)
  async updateTodo(@Param('id') id: string, @Body() updates: UpdateTodoDto) {
    const todos = await this.load();
    const idx = await this.findIdxById(id);
    const todo = todos[idx];
    todos[idx] = {
      ...todo,
      ...updates,
    };
    await this.save(todos);

    console.log('Sending Response');
    return todos[idx];
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a new todo' })
  @ApiResponse({ type: DeleteResponseDto })
  async deleteTodo(@Param('id') id: string): Promise<DeleteResponseDto> {
    const _todos = await this.load();
    const idx = await this.findIdxById(id);
    const todos = [..._todos.slice(0, idx), ..._todos.slice(idx + 1)];

    await this.save(todos);

    const stillExists = await this.findById(id);
    if (stillExists) {
      console.log('Delete failed', id);
    }

    return { ok: !stillExists };
  }

  private findById = async (id: string) => {
    const todos = await this.load();
    return todos.find((todo) => todo.id === id);
  };
  private findIdxById = async (id: string) => {
    const todos = await this.load();
    return todos.findIndex((todo) => todo.id === id);
  };

  private todosCachePath = resolve(process.cwd(), '_data_', 'todos.json');
  private save = async (todos: Todo[]) => {
    const content = JSON.stringify(todos, null, 2);
    await ensureFile(this.todosCachePath);
    await writeFile(this.todosCachePath, content, 'utf8');
  };
  private load = async (): Promise<Todo[]> => {
    try {
      const content = await readFile(this.todosCachePath, 'utf8');
      return JSON.parse(content) as Todo[];
    } catch (err) {
      return [];
    }
  };
}
