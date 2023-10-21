import { PaginationParams } from '@/core/repositories/pagination-params';
import { Answer } from '../../enterprise/entities/answer';

export abstract class AnswersRepository {
  abstract findById(id: string): Promise<Answer | null>;
  abstract findManyByQuestionId(questionId: string, params: PaginationParams): Promise<Answer[]>;
  abstract create(anwser: Answer): Promise<void>;
  abstract save(anwser: Answer): Promise<void>;
  abstract delete(anwser: Answer): Promise<void>;
}
