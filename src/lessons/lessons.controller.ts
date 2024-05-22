import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CreateEvaluationDto } from '../evaluations/dto/create-evaluation.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Уроки')
@Controller('lessons')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Получение списка занятий с оценками пользователей' })
  @ApiResponse({ status: 200, description: 'OK' })
  async getLessons() {
    return this.lessonsService.getLessons();
  }

  @Post()
  @ApiOperation({ summary: 'Создание занятия' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createLesson(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.createLesson(createLessonDto);
  }

  @Post(':id/evaluations')
  @ApiOperation({ summary: 'Проставление оценки за занятие' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async createEvaluation(@Param('id') id: string, @Body() createEvaluationDto: CreateEvaluationDto) {
    return this.lessonsService.createEvaluation(+id, createEvaluationDto);
  }
}
