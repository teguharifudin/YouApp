import { ApiHideProperty, ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

enum Gender {
  Male = 'Male',
  Female = 'Female',
}

enum Horoscope {
  Aries = 'Aries',
  Taurus = 'Taurus',
  Gemini = 'Gemini',
  Cancer = 'Cancer',
  Leo = 'Leo',
  Virgo = 'Virgo',
  Libra = 'Libra',
  Scorpius = 'Scorpius',
  Sagittarius = 'Sagittarius',
  Capricornus = 'Capricornus',
  Aquarius = 'Aquarius',
  Pisces = 'Pisces',
}

enum Zodiac {
  Rat = 'Rat',
  Ox = 'Ox',
  Tiger = 'Tiger',
  Rabbit = 'Rabbit',
  Dragon = 'Dragon',
  Snake = 'Snake',
  Horse = 'Horse',
  Goat = 'Goat',
  Monkey = 'Monkey',
  Rooster = 'Rooster',
  Dog = 'Dog',
  Pig = 'Pig',
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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  birthday: string;

  @ApiProperty({
    enum: Horoscope,
    isArray: true,
    example: [Horoscope.Aries, Horoscope.Taurus, Horoscope.Gemini, Horoscope.Cancer, Horoscope.Leo, Horoscope.Virgo, Horoscope.Libra, Horoscope.Scorpius, Horoscope.Sagittarius, Horoscope.Capricornus, Horoscope.Aquarius, Horoscope.Pisces],
  })
  @IsString()
  @IsOptional()
  horoscope: string;

  @ApiProperty({
    enum: Zodiac,
    isArray: true,
    example: [Zodiac.Rat, Zodiac.Ox, Zodiac.Tiger, Zodiac.Rabbit, Zodiac.Dragon, Zodiac.Snake, Zodiac.Horse, Zodiac.Goat, Zodiac.Monkey, Zodiac.Rooster, Zodiac.Dog, Zodiac.Pig],
  })
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
