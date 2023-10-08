import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

import { Comment as PrismComment, Prisma } from '@prisma/client';

export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismComment): AnswerComment {
    if (!raw.answerId) {
      throw new Error('Invalid comment type');
    }

    const answercomment = AnswerComment.create({
      content: raw.content,
      authorId: new UniqueEntityID(raw.authorId),
      answerId: new UniqueEntityID(raw.answerId),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }, new UniqueEntityID(raw.id));

    return answercomment;
  }

  static toPersistence(
    answerComment: AnswerComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
      answerId: answerComment.answerId.toString(),
      content: answerComment.content,
      createdAt: answerComment.createdAt,
      updatedAt: answerComment.updatedAt,
    };
  }
}


