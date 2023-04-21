import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskControllerController } from './tasks/controllers/task.controller';

@Module({
  controllers: [AppController, TaskControllerController],
  providers: [AppService],
})
export class AppModule {}
