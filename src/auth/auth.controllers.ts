import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from './shared/auth.service';
import { LocalAuthGuard } from './shared/local-auth.guard';
import { Controller, UseGuards, Request, Post } from '@nestjs/common';

@ApiTags('Auth')
@Controller()
@UseGuards(LocalAuthGuard)
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiSecurity('basic')
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
