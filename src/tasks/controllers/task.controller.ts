import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { CreateTaskDto } from '../dto/task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
  ): Promise<Task[]> {
    return await this.taskService.findAll(page, limit, sort);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Task> {
    return await this.taskService.findById(id);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskService.create(createTaskDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return await this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.taskService.delete(id);
  }
}
