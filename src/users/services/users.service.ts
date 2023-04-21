import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { id: 1, username: 'admin', password: 'admin', role: 'ADMIN' },
    { id: 2, username: 'user', password: 'user', role: 'USER' },
  ];

  async findByUsername(username: string): Promise<User> {
    return this.users.find((user) => user.username === username);
  }

  async findById(id: number): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}
