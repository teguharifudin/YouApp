import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email } = createUserDto;
    const existingUser = await this.userModel.findOne({ username });
    const existingEmail = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Username already exists!');
    }
    if (existingEmail) {
      throw new ConflictException('Email already exists!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username,
      password: hashedPassword,
      email
    });
    return newUser.save();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }
}
