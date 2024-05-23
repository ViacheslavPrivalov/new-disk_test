import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: 'Email администратора' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Пароль администратора' })
  @IsString()
  password: string;
}
