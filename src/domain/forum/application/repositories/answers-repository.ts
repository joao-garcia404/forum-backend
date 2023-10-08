import { PaginationParams } from '@/core/repositories/pagination-params';
import { Answer } from '../../enterprise/entities/answer';

export interface AnswersRepository {
  findById(id: string): Promise<Answer | null>;
  findManyByQuestionId(questionId: string, params: PaginationParams): Promise<Answer[]>;
  create(anwser: Answer): Promise<void>;
  save(anwser: Answer): Promise<void>;
  delete(anwser: Answer): Promise<void>;
}
