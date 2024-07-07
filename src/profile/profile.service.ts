import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class ProfileService {
  constructor(@InjectModel('Profile') private profileModel: Model<Profile>){}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const { username, fullName, gender, birthday, horoscope, zodiac, height, weight, interest, file  } = createProfileDto;
    const existingUser = await this.profileModel.findOne({ username });
    if (existingUser) {
      throw new UnauthorizedException('Profile already exists!');
    }
    const newProfile = new this.profileModel({
      username, 
      fullName, 
      gender, 
      birthday, 
      horoscope, 
      zodiac, 
      height, 
      weight, 
      interest, 
      file
    });
    return newProfile.save();
  }

  async findOne(username: string) { 
    return this.profileModel.findOne({ username });
  }

  async update(id: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    const user = await this.profileModel.findByIdAndUpdate(id, updateProfileDto, { new: true });
    if (!user) {
        throw new NotFoundException('Profile #${id} not found');
    }
    return user;
  }
}
