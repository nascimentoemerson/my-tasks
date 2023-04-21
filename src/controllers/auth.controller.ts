import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../auth/services/auth.service';
import { LoginDto } from 'src/dto/login.dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

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
