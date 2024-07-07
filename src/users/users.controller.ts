import { Controller, Post, Body,  Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('Register')
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto, @Req() req: any) {
    if (req.body.password !== req.body.passwordConfirm ) {
      throw new UnauthorizedException('Password not same with Password Confirmation');
    }
    return this.usersService.create(createUserDto);
  }
}
