import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

import { Answer as PrismaAnswer, Prisma } from '@prisma/client';

export class PrismaAnswerMapper {
  static toDomain(raw: PrismaAnswer): Answer {
    const answer = Answer.create({
      content: raw.content,
      authorId: new UniqueEntityID(raw.authorId),
      questionId: new UniqueEntityID(raw.questionId),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }, new UniqueEntityID(raw.id));

    return answer;
  }

  static toPersistence(answer: Answer): Prisma.AnswerUncheckedCreateInput {
    return {
      id: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: answer.content,
      questionId: answer.questionId.toString(),
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    };
  }
}


