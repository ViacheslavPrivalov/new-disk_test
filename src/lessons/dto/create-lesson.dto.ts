import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ description: 'Название урока' })
  @IsString()
  @MinLength(4, { message: 'Название урока не должно быть корроче 4 символов' })
  name: string;

  @ApiProperty({ description: 'Код урока' })
  @IsString()
  @MinLength(4, { message: 'Код урока не может быть корроче 4 символов' })
  code: string;
}
