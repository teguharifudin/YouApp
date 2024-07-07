import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('Login')
  @Post('login')
  signIn(@Body() signInDto: CreateUserDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
