import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Evaluation } from '../../evaluations/entities/evaluattion.entity';

@Entity({ name: 'lessons' })
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 20 })
  code: string;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.lesson)
  evaluations: Evaluation[];
}
