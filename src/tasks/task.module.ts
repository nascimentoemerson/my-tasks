import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './shared/task.service';
import { TaskSchema } from './schemas/task.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateTaskDto } from './shared/task.dto';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
  controllers: [TaskController],
  providers: [TaskService, CreateTaskDto],
})
export class TaskModule {}
