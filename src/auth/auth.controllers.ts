import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from './shared/auth.service';
import { LocalAuthGuard } from './shared/local-auth.guard';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiSecurity('basic')
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
