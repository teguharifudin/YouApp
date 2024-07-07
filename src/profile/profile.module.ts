import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from './schemas/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
