import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from 'src/tasks/dto/login.dto';
import { JwtAuthGuard } from '../guards/auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Post('auth/me')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.authService.validate(username, password);
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.authService.login(payload),
    };
  }
}
