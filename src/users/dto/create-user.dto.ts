import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  createdAt: Date;
}
