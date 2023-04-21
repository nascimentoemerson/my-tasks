import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../models/task.model';
import { CreateTaskDto } from '../dto/task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel({
      title: createTaskDto.title,
      description: createTaskDto.description,
      completed: false,
    });
    return await task.save();
  }

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findById(id: string): Promise<Task> {
    return await this.taskModel.findById(id).exec();
  }

  async update(id: string, updateTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      return null;
    }
    const updatedTask = await this.taskModel.findOneAndUpdate(
      { _id: id },
      { $set: updateTaskDto },
      { new: true },
    );
    return updatedTask;
  }

  async delete(id: string): Promise<void> {
    await this.taskModel.findByIdAndDelete(id).exec();
  }
}
