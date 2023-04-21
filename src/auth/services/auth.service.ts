import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { UsersService } from 'src/users/services/users.service';
import { User } from '../../users/entities/user.entity';
import { LoginDto } from 'src/tasks/dto/login.dto';

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

  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; user: { id: number; username: string } }> {
    const user = await this.usersService.findByUsernameAndPassword(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid login credentials');
    }
    const payload: JwtPayload = {
      sub: user.id,
      username: '',
      role: '',
    };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
      user: { id: user.id, username: user.username },
    };
  }
}
