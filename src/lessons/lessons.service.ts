import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateEvaluationDto } from '../evaluations/dto/create-evaluation.dto';
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

  async getLessons() {
    const lessons = await this.lessonRepository.find({
      relations: ['evaluations', 'evaluations.user'],
    });

    return lessons.map((lesson) => ({
      id: lesson.id.toString(),
      name: lesson.name,
      code: lesson.code,
      evaluations: lesson.evaluations.map((evaluation) => ({
        id: evaluation.id.toString(),
        score: evaluation.score.toString(),
        user: {
          id: evaluation.user.id.toString(),
          name: evaluation.user.name,
          email: evaluation.user.email,
        },
      })),
    }));
  }

  async createLesson(dto: CreateLessonDto) {
    const newLesson = this.lessonRepository.create({ ...dto });

    await this.lessonRepository.save(newLesson);

    return { id: newLesson.id.toString(), ...dto };
  }

  async createEvaluation(id: number, dto: CreateEvaluationDto) {
    const lesson = await this.lessonRepository.findOneBy({ id });

    if (!lesson) throw new NotFoundException('Урок не был найден');

    const user = await this.userRepository.findOneBy({ id: Number(dto.user_id) });

    const newEvaluation = this.evaluationRepository.create({
      score: Number(dto.score),
      lesson,
      user,
    });

    await this.evaluationRepository.save(newEvaluation);

    return { id: newEvaluation.id.toString(), ...dto };
  }
}
