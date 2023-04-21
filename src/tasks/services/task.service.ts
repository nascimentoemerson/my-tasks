import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../models/task.model';
import { CreateTaskDto } from '../dto/task.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = plainToClass(Task, createTaskDto);
    const createdTask = new this.taskModel(task);
    return await createdTask.save();
  }

  async findAll(page: number, limit: number, sort: string): Promise<Task[]> {
    const skip = (page - 1) * limit;
    return await this.taskModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();
  }

  async findById(id: string): Promise<Task> {
    return await this.taskModel.findById(id).exec();
  }

  async update(id: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const task = plainToClass(Task, createTaskDto);
    return await this.taskModel
      .findByIdAndUpdate(id, task, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.taskModel.findByIdAndDelete(id).exec();
  }
}
