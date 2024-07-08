import { ApiHideProperty, ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export class CreateProfileDto {
  
  @ApiHideProperty()
  @IsString()
  username: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    enum: Gender,
    isArray: true,
    example: [Gender.Male, Gender.Female],
  })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ example: '1921-10-07' })
  @IsString()
  @IsNotEmpty()
  birthday: string;

  @ApiHideProperty()
  @IsString()
  @IsOptional()
  horoscope: string;

  @ApiHideProperty()
  @IsString()
  @IsOptional()
  zodiac: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  height: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  weight: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  interest: string;

  @ApiProperty({ format: 'binary' })
  @IsOptional()
  file: string;

  createdAt: Date;

  updatedAt: Date;
}
