import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { TaskModule } from './tasks/task.module';
import { UsersModule } from './users/users.module';
import { customHeaderMiddleware } from './middleware/custom-header.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://emerson776475:teste@cluster0.74yrmuc.mongodb.net/?retryWrites=true&w=majority',
    ),
    TaskModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(customHeaderMiddleware).forRoutes('*');
  }
}
