import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  NotFoundException,
  Put,
  UseGuards,
} from '@nestjs/common';

import { TaskService } from './shared/task.service';
import { Task } from 'src/tasks/schemas/task.schemas';
import { CreateTaskDto } from 'src/tasks/shared/task.dto';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Task> {
    return await this.taskService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const updatedTask = await this.taskService.update(id, updateTaskDto);
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updatedTask;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.taskService.delete(id);
  }
}
