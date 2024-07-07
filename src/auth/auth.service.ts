import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException('Wrong Password!');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
