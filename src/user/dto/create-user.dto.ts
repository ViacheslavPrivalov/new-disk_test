import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Имя пользователя' })
  @IsString()
  @MinLength(4, { message: 'Имя пользователя не должно быть корроче 4 символов' })
  name: string;

  @ApiProperty({ description: 'Почта пользователя' })
  @IsEmail()
  @MinLength(4, { message: 'Почта пользователя не должна быть корроче 4 символов' })
  email: string;
}
