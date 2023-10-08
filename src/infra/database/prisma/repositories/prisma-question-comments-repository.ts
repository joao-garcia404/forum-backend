import { Injectable } from '@nestjs/common';

import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

import { PrismaService } from '../prisma.service';
import { PrismaQuestionCommentMapper } from '../mappers/prisma-question-comment-mapper';

@Injectable()
export class PrismaQuestionsComments implements QuestionCommentsRepository {
  constructor(
    private prisma: PrismaService,
  ) { }

  async findById(id: string) {
    const questionComment = await this.prisma.comment.findUnique({
      where: {
        id,
      }
    });

    if (!questionComment) return null;

    return PrismaQuestionCommentMapper.toDomain(questionComment);
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const comments = await this.prisma.comment.findMany({
      where: {
        questionId: questionId,
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return comments.map(PrismaQuestionCommentMapper.toDomain);
  }

  async create(questionComment: QuestionComment) {
    const data = PrismaQuestionCommentMapper.toPersistence(questionComment);

    await this.prisma.comment.create({
      data,
    });
  }

  async delete(questionComment: QuestionComment) {
    const data = PrismaQuestionCommentMapper.toPersistence(questionComment);

    await this.prisma.comment.delete({
      where: {
        id: data.id,
      }
    });
  }
}
