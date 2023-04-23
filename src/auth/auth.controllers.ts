import { ApiBearerAuth, ApiBody, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from './shared/auth.service';
import { LocalAuthGuard } from './shared/local-auth.guard';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(LocalAuthGuard)
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiSecurity('jwt', ['Bearer'])
  @Post('login')
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'user@example.com',
        },
        password: {
          type: 'string',
          example: 'password',
        },
      },
    },
  })
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
