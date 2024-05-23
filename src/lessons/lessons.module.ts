import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Evaluation } from '../evaluations/entities/evaluattion.entity';
import { User } from '../user/entities/user.entity';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService],
  imports: [TypeOrmModule.forFeature([Lesson, User, Evaluation])],
})
export class LessonsModule {}
