import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateEvaluationDto } from '../evaluations/dto/create-evaluation.dto';
import { LessonDto } from './dto/lesson.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Evaluation } from '../evaluations/entities/evaluattion.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find({ relations: { evaluations: true } });
  }

  async createLesson(dto: CreateLessonDto): Promise<LessonDto> {
    const newLesson = this.lessonRepository.create({ ...dto });

    await this.lessonRepository.save(newLesson);
    const lessonDto: LessonDto = { ...newLesson };

    return lessonDto;
  }

  async createEvaluation(id: number, dto: CreateEvaluationDto) {
    const lesson = await this.lessonRepository.findOneBy({ id });

    if (!lesson) throw new NotFoundException('Урок не был найден');

    const user = await this.userRepository.findOneBy({ id: dto.user_id });

    const newEvaluation = this.evaluationRepository.create({
      score: dto.score,
      createdAt: Date.now(),
      lesson,
      user,
    });

    await this.evaluationRepository.save(newEvaluation);

    return { id: newEvaluation.id, ...dto };
  }
}
