import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../models/task.model';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findById(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async create(newTask: Task): Promise<Task> {
    const createdTask = new this.taskModel(newTask);
    return createdTask.save();
  }

  async update(id: string, updatedTask: Task): Promise<Task> {
    await this.taskModel.updateOne({ _id: id }, updatedTask).exec();
    return this.findById(id);
  }

  async delete(taskId: string): Promise<void> {
    await this.taskModel.deleteOne({ _id: taskId }).exec();
  }
}
