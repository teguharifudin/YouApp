import { Controller, UseGuards, Post, Body, Get, Param, UseInterceptors, UploadedFile, Res, Req, Patch } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '../auth/auth.guard';

function dateToHoroscopeSign(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return getHoroscopeSign(day, month);
}

function getHoroscopeSign(day, month) {
  var horoscopeSigns = {
    'capricorn':'Capricorn',
    'aquarius':'Aquarius',
    'pisces':'Pisces',
    'aries':'Aries',
    'taurus':'Taurus',
    'gemini':'Gemini',
    'cancer':'Cancer',
    'leo':'Leo',
    'virgo':'Virgo',
    'libra':'Libra',
    'scorpio':'Scorpio',
    'sagittarius':'Sagittarius'
  }

  if((month == 1 && day <= 20) || (month == 12 && day >=22)) {
    return horoscopeSigns.capricorn;
  } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
    return horoscopeSigns.aquarius;
  } else if((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
    return horoscopeSigns.pisces;
  } else if((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
    return horoscopeSigns.aries;
  } else if((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
    return horoscopeSigns.taurus;
  } else if((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
    return horoscopeSigns.gemini;
  } else if((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
    return horoscopeSigns.cancer;
  } else if((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
    return horoscopeSigns.leo;
  } else if((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
    return horoscopeSigns.virgo;
  } else if((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
    return horoscopeSigns.libra;
  } else if((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
    return horoscopeSigns.scorpio;
  } else if((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
    return horoscopeSigns.sagittarius;
  }
}

function dateToZodiacSign(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  if(year%12 === 0) {
    return "Monkey";
  } else if (year%12 === 1) {
    return "Rooster";
  } else if (year%12 === 2) {
    return "Dog";
  } else if (year%12 === 3) {
    return "Pig";
  } else if (year%12 === 4) {
    return "Rat";
  } else if (year%12 === 5) {
    return "Ox";
  } else if (year%12 === 6) {
    return "Tiger";
  } else if (year%12 === 7) {
    return "Rabbit";
  } else if (year%12 === 8) {
    return "Dragon";
  } else if (year%12 === 9) {
    return "Horse";
  } else if (year%12 === 10) {
    return "Horse";
  } else {
    return "Sheep";
  }
}

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
    createProfileDto.horoscope = dateToHoroscopeSign(req.body.birthday)
    createProfileDto.zodiac = dateToZodiacSign(req.body.birthday)
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
    updateProfileDto.horoscope = dateToHoroscopeSign(req.body.birthday)
    updateProfileDto.zodiac = dateToZodiacSign(req.body.birthday)
    return this.profileService.update(id, updateProfileDto);
  }
}
