import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { CreateTaskDto } from '../dto/task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Task> {
    return await this.taskService.findById(id);
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

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

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.taskService.delete(id);
  }
}
