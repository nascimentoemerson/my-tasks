import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from 'src/tasks/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const user = await this.authService.login(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid login credentials');
    }
    return {
      access_token: user.access_token,
      user: user.user && { id: user.user.id, username: user.user.username }, // Verifica se user é definido antes de acessar sua propriedade id
    };
  }
}
