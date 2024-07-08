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
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}${month}${day}`;
  return getZodiacSign(formattedDate);
}

function getZodiacSign(formattedDate) {
  var zodiacSigns = {
    'rat':'Rat',
    'ox':'Ox',
    'tiger':'Tiger',
    'rabbit':'Rabbit',
    'dragon':'Dragon',
    'snake':'Snake',
    'horse':'Horse',
    'goat':'Goat',
    'monkey':'Monkey',
    'dog':'Dog',
    'rooster':'Rooster',
    'boar':'Boar'
  }

  if (formattedDate >= 19120218 && formattedDate <= 19130205) {
    return zodiacSigns.rat;
  }
  else if (formattedDate >= 19130206 && formattedDate <= 19140125) { 
    return zodiacSigns.ox;
  }
  else if(formattedDate >= 19140126 && formattedDate <= 19150213) {
    return zodiacSigns.tiger;
  }
  else if(formattedDate >= 19150214 && formattedDate <= 19160202) {
    return zodiacSigns.rabbit;
  }
  else if(formattedDate >= 19160203 && formattedDate <= 19170122) {
    return zodiacSigns.dragon;
  }
  else if(formattedDate >= 19170123 && formattedDate <= 19180210) {
    return zodiacSigns.snake;
  } 
  else if(formattedDate >= 19180211 && formattedDate <= 19190131) {
    return zodiacSigns.horse;
  } 
  else if(formattedDate >= 19190201 && formattedDate <= 19200219) {
    return zodiacSigns.goat;
  } 
  else if(formattedDate >= 19200220 && formattedDate <= 19210207) {
    return zodiacSigns.monkey;
  } 
  else if(formattedDate >= 19210208 && formattedDate <= 19220127) {
    return zodiacSigns.rooster;
  } 
  else if(formattedDate >= 19220128 && formattedDate <= 19230215) {
    return zodiacSigns.dog;
  } 
  else if(formattedDate >= 19230216 && formattedDate <= 19240204) {
    return zodiacSigns.boar;
  } 
  else if(formattedDate >= 19240205 && formattedDate <= 19250124) {
    return zodiacSigns.rat;
  } 
  else if(formattedDate >= 19250125 && formattedDate <= 19260212) {
    return zodiacSigns.ox;
  } 
  else if(formattedDate >= 19260213 && formattedDate <= 19270201) {
    return zodiacSigns.tiger;
  } 
  else if(formattedDate >= 19270202 && formattedDate <= 19280122) {
    return zodiacSigns.rabbit;
  } 
  else if(formattedDate >= 19280123 && formattedDate <= 19290209) {
    return zodiacSigns.dragon;
  } 
  else if(formattedDate >= 19290210 && formattedDate <= 19300129) {
    return zodiacSigns.snake;
  } 
  else if(formattedDate >= 19300130 && formattedDate <= 19310216) {
    return zodiacSigns.horse;
  } 
  else if(formattedDate >= 19310217 && formattedDate <= 19320205) {
    return zodiacSigns.goat;
  } 
  else if(formattedDate >= 19320206 && formattedDate <= 19330125) {
    return zodiacSigns.monkey;
  } 
  else if(formattedDate >= 19330126 && formattedDate <= 19340213) {
    return zodiacSigns.rooster;
  } 
  else if(formattedDate >= 19340214 && formattedDate <= 19350203) {
    return zodiacSigns.dog;
  } 
  else if(formattedDate >= 19350204 && formattedDate <= 19360123) {
    return zodiacSigns.boar;
  } 
  else if(formattedDate >= 19360124 && formattedDate <= 19370210) {
    return zodiacSigns.rat;
  } 
  else if(formattedDate >= 19370211 && formattedDate <= 19380130) {
    return zodiacSigns.ox;
  } 
  else if(formattedDate >= 19380131 && formattedDate <= 19390218) {
    return zodiacSigns.tiger;
  } 
  else if(formattedDate >= 19390219 && formattedDate <= 19400207) {
    return zodiacSigns.rabbit;
  } 
  else if(formattedDate >= 19400208 && formattedDate <= 19410126) {
    return zodiacSigns.dragon;
  } 
  else if(formattedDate >= 19410127 && formattedDate <= 19420214) {
    return zodiacSigns.snake;
  } 
  else if(formattedDate >= 19420215 && formattedDate <= 19430204) {
    return zodiacSigns.horse;
  } 
  else if(formattedDate >= 19430205 && formattedDate <= 19440124) {
    return zodiacSigns.goat;
  } 
  else if(formattedDate >= 19440125 && formattedDate <= 19450212) {
    return zodiacSigns.monkey;
  } 
  else if(formattedDate >= 19450213 && formattedDate <= 19460201) {
    return zodiacSigns.rooster;
  } 
  else if(formattedDate >= 19460202 && formattedDate <= 19470121) {
    return zodiacSigns.dog;
  } 
  else if(formattedDate >= 19470122 && formattedDate <= 19480209) {
    return zodiacSigns.boar;
  } 
  else if(formattedDate >= 19480210 && formattedDate <= 19490128) {
    return zodiacSigns.rat;
  } 
  else if(formattedDate >= 19490129 && formattedDate <= 19500216) {
    return zodiacSigns.ox;
  } 
  else if(formattedDate >= 19500217 && formattedDate <= 19510205) {
    return zodiacSigns.tiger;
  } 
  else if(formattedDate >= 19510206 && formattedDate <= 19520126) {
    return zodiacSigns.rabbit;
  } 
  else if(formattedDate >= 19520127 && formattedDate <= 19530213) {
    return zodiacSigns.dragon;
  } 
  else if(formattedDate >= 19530214 && formattedDate <= 19540202) {
    return zodiacSigns.snake;
  } 
  else if(formattedDate >= 19540203 && formattedDate <= 19550123) {
    return zodiacSigns.horse;
  } 
  else if(formattedDate >= 19550124 && formattedDate <= 19560211) {
    return zodiacSigns.goat;
  } 
  else if(formattedDate >= 19560212 && formattedDate <= 19570130) {
    return zodiacSigns.monkey;
  } 
  else if(formattedDate >= 19570131 && formattedDate <= 19580217) {
    return zodiacSigns.rooster;
  } 
  else if(formattedDate >= 19580218 && formattedDate <= 19590207) {
    return zodiacSigns.dog;
  } 
  else if(formattedDate >= 19590208 && formattedDate <= 19600127) {
    return zodiacSigns.boar;
  } 
  else if(formattedDate >= 19600128 && formattedDate <= 19610214) {
    return zodiacSigns.rat;
  } 
  else if(formattedDate >= 19610215 && formattedDate <= 19620204) {
    return zodiacSigns.ox;
  } 
  else if(formattedDate >= 19620205 && formattedDate <= 19630124) {
    return zodiacSigns.tiger;
  } 
  else if(formattedDate >= 19630125 && formattedDate <= 19640212) {
    return zodiacSigns.rabbit;
  } 
  else if(formattedDate >= 19640213 && formattedDate <= 19650201) {
    return zodiacSigns.dragon;
  } 
  else if(formattedDate >= 19650202 && formattedDate <= 19660120) {
    return zodiacSigns.snake;
  } 
  else if(formattedDate >= 19660121 && formattedDate <= 19670208) {
    return zodiacSigns.horse;
  } 
  else if(formattedDate >= 19670209 && formattedDate <= 19680129) {
    return zodiacSigns.goat;
  } 
  else if(formattedDate >= 19680130 && formattedDate <= 19690216) {
    return zodiacSigns.monkey;
  } 
  else if(formattedDate >= 19690217 && formattedDate <= 19700205) {
    return zodiacSigns.rooster;
  } 
  else if(formattedDate >= 19700206 && formattedDate <= 19710126) {
    return zodiacSigns.dog;
  } 
  else if(formattedDate >= 19710127 && formattedDate <= 19720115) {
    return zodiacSigns.boar;
  } 
  else if(formattedDate >= 19720116 && formattedDate <= 19730202) {
    return zodiacSigns.rat;
  } 
  else if(formattedDate >= 19730203 && formattedDate <= 19740122) {
    return zodiacSigns.ox;
  } 
  else if(formattedDate >= 19740123 && formattedDate <= 19750210) {
    return zodiacSigns.tiger;
  } 
  else if(formattedDate >= 19750211 && formattedDate <= 19760130) {
    return zodiacSigns.rabbit;
  } 
  else if(formattedDate >= 19760131 && formattedDate <= 19770217) {
    return zodiacSigns.dragon;
  } 
  else if(formattedDate >= 19770218 && formattedDate <= 19780206) {
    return zodiacSigns.snake;
  } 
  else if(formattedDate >= 19780207 && formattedDate <= 19790127) {
    return zodiacSigns.horse;
  } 
  else if(formattedDate >= 19790128 && formattedDate <= 19800215) {
    return zodiacSigns.goat;
  } 
  else if(formattedDate >= 19800216 && formattedDate <= 19810204) {
    return zodiacSigns.monkey;
  } 
  else if(formattedDate >= 19810205 && formattedDate <= 19820124) {
    return zodiacSigns.rooster;
  } 
  else if(formattedDate >= 19820125 && formattedDate <= 19830212) {
    return zodiacSigns.dog;
  } 
  else if(formattedDate >= 19830213 && formattedDate <= 19840201) {
    return zodiacSigns.boar;
  } 
  else if(formattedDate >= 19840202 && formattedDate <= 19850219) {
    return zodiacSigns.rat;
  } 
  else if(formattedDate >= 19850220 && formattedDate <= 19860208) {
    return zodiacSigns.ox;
  } 
  else if(formattedDate >= 19860209 && formattedDate <= 19870128) {
    return zodiacSigns.tiger;
  } 
  else if(formattedDate >= 19870129 && formattedDate <= 19880216) {
    return zodiacSigns.rabbit;
  } 
  else if(formattedDate >= 19880217 && formattedDate <= 19890205) {
    return zodiacSigns.dragon;
  } 
  else if(formattedDate >= 19890206 && formattedDate <= 19900126) {
    return zodiacSigns.snake;
  } 
  else if(formattedDate >= 19900127 && formattedDate <= 19910214) {
    return zodiacSigns.horse;
  } 
  else if(formattedDate >= 19910215 && formattedDate <= 19920203) {
    return zodiacSigns.goat;
  } 
  else if(formattedDate >= 19920204 && formattedDate <= 19930122) {
    return zodiacSigns.monkey;
  } 
  else if(formattedDate >= 19930123 && formattedDate <= 19940209) {
    return zodiacSigns.rooster;
  } 
  else if(formattedDate >= 19940210 && formattedDate <= 19950130) {
    return zodiacSigns.dog;
  } 
  else if(formattedDate >= 19950131 && formattedDate <= 19960218) {
    return zodiacSigns.boar;
  } 
  else if(formattedDate >= 19960219 && formattedDate <= 19970206) {
    return zodiacSigns.rat;
  } 
  else if(formattedDate >= 19970207 && formattedDate <= 19980127) {
    return zodiacSigns.ox;
  } 
  else if(formattedDate >= 19980128 && formattedDate <= 19990215) {
    return zodiacSigns.tiger;
  } 
  else if(formattedDate >= 19990216 && formattedDate <= 20000204) {
    return zodiacSigns.rabbit;
  } 
  else if(formattedDate >= 20000205 && formattedDate <= 20010123) {
    return zodiacSigns.dragon;
  } 
  else if(formattedDate >= 20010124 && formattedDate <= 20020211) {
    return zodiacSigns.snake;
  } 
  else if(formattedDate >= 20020212 && formattedDate <= 20030131) {
    return zodiacSigns.horse;
  } 
  else if(formattedDate >= 20030201 && formattedDate <= 20040121) {
    return zodiacSigns.goat;
  } 
  else if(formattedDate >= 20040122 && formattedDate <= 20050208) {
    return zodiacSigns.monkey;
  } 
  else if(formattedDate >= 20050209 && formattedDate <= 20060128) {
    return zodiacSigns.rooster;
  } 
  else if(formattedDate >= 20060129 && formattedDate <= 20070217) {
    return zodiacSigns.dog;
  } 
  else if(formattedDate >= 20070218 && formattedDate <= 20080206) {
    return zodiacSigns.boar;
  } 
  else if(formattedDate >= 20080207 && formattedDate <= 20090125) {
    return zodiacSigns.rat;
  } 
  else if(formattedDate >= 20090126 && formattedDate <= 20100213) {
    return zodiacSigns.ox;
  } 
  else if(formattedDate >= 20100214 && formattedDate <= 20110202) {
    return zodiacSigns.tiger;
  } 
  else if(formattedDate >= 20110203 && formattedDate <= 20120122) {
    return zodiacSigns.rabbit;
  } 
  else if(formattedDate >= 20120123 && formattedDate <= 20130209) {
    return zodiacSigns.dragon;
  } 
  else if(formattedDate >= 20130210 && formattedDate <= 20140130) {
    return zodiacSigns.snake;
  } 
  else if(formattedDate >= 20140131 && formattedDate <= 20150218) {
    return zodiacSigns.horse;
  } 
  else if(formattedDate >= 20150219 && formattedDate <= 20160207) {
    return zodiacSigns.goat;
  } 
  else if(formattedDate >= 20160208 && formattedDate <= 20170127) {
    return zodiacSigns.monkey;
  } 
  else if(formattedDate >= 20170128 && formattedDate <= 20180215) {
    return zodiacSigns.rooster;
  } 
  else if(formattedDate >= 20180216 && formattedDate <= 20190204) {
    return zodiacSigns.dog;
  } 
  else if(formattedDate >= 20190205 && formattedDate <= 20200124) {
    return zodiacSigns.boar;
  } 
  else if(formattedDate >= 20200125 && formattedDate <= 20210211) {
    return zodiacSigns.rat;
  } 
  else if(formattedDate >= 20210212 && formattedDate <= 20220131) {
    return zodiacSigns.ox;
  } 
  else if(formattedDate >= 20220201 && formattedDate <= 20230121) {
    return zodiacSigns.tiger;
  } 
  else if(formattedDate >= 20230122 && formattedDate <= 20240209) {
    return zodiacSigns.rabbit;
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
