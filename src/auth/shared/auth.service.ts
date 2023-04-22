import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/shared/users.service';

@Injectable()
export class AuthService {
  constructor(private usersServices: UsersService) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.usersServices.getByemail(userEmail);
    if (user && userPassword === userPassword) {
      const { _id, name, email } = user;
      return { id: _id, name, email };
    }
    return null;
  }
}
