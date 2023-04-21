import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './tasks/task.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://teste:teste@cluster0.74yrmuc.mongodb.net/?retryWrites=true&w=majority'),
    TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
