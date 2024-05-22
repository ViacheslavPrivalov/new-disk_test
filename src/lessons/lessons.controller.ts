import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CreateEvaluationDto } from '../evaluations/dto/create-evaluation.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@Controller('lessons')
@UseGuards(AuthGuard)
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  @Public()
  async getLessons() {
    return this.lessonsService.getLessons();
  }

  @Post()
  async createLesson(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.createLesson(createLessonDto);
  }

  @Post(':id/evaluations')
  async createEvaluation(@Param('id') id: string, @Body() createEvaluationDto: CreateEvaluationDto) {
    return this.lessonsService.createEvaluation(+id, createEvaluationDto);
  }
}
