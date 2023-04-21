import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { TaskSchema } from './schemas/task.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/task.dto';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
  controllers: [TaskController],
  providers: [TaskService, CreateTaskDto],
})
export class TaskModule {}
