import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CreateEvaluationDto } from '../evaluations/dto/create-evaluation.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  async getLessons() {
    return this.lessonsService.getLessons();
  }

  @Post()
  async createLesson(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.createLesson(createLessonDto);
  }

  @Post(':id/evaluations')
  async createEvaluation(@Param('id') id: number, @Body() createEvaluationDto: CreateEvaluationDto) {
    return this.lessonsService.createEvaluation(id, createEvaluationDto);
  }
}
