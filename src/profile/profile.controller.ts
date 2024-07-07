import { Controller, UseGuards, Post, Body, Get, Param, UseInterceptors, UploadedFile, Res, Req, Patch } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('Create Profile')
  @Post('createProfile')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
        filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProfileDto })
  create(@Body() createProfileDto: CreateProfileDto, @UploadedFile() file, @Req() req: any) {
    createProfileDto.file = file.filename
    createProfileDto.username = req.user.username
    return this.profileService.create(createProfileDto);
  }

  @ApiTags('Get Profile')
  @Get('getProfile/:username')
  findOne(@Param('username') username: string) {
    return this.profileService.findOne(username);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiTags('Update Profile')
  @Patch('updateProfile/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
        filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateProfileDto })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto, @UploadedFile() file, @Req() req: any) {
    if(file){
      updateProfileDto.file = file.filename
    }
    return this.profileService.update(id, updateProfileDto);
  }
}
