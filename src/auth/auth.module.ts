import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'SECRET',
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [
    AuthService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
