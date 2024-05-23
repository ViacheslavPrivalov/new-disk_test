import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class CreateEvaluationDto {
  @ApiProperty({ description: 'Идентификатор пользователя' })
  @IsNumberString()
  user_id: string;

  @ApiProperty({ description: 'Оценка пользователя' })
  @IsNumberString()
  score: string;
}
