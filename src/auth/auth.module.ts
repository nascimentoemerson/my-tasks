import { Module } from '@nestjs/common';
import { AuthService } from './shared/auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './shared/local.strategy';
import { AuthController } from './auth.controllers';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
