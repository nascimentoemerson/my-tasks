import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // Adicione o decorador @InjectRepository(User) aqui
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
