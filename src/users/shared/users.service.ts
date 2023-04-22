import { User } from './user';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAll() {
    return await this.userModel.find().exec();
  }

  async getById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async getByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async create(user: User) {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async updateUser(id: string, updateUserData: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserData,
      { new: true },
    );

    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return deletedUser;
  }
}
