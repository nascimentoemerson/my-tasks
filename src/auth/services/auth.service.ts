import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { UsersService } from 'src/users/services/users.service';
import { User } from '../user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(payload: JwtPayload): Promise<User> {
    const { sub: id } = payload;
    const user = await this.usersService.findOne(parseInt(id, 10));
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
