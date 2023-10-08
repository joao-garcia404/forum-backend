import { Injectable } from '@nestjs/common';

import { PaginationParams } from '@/core/repositories/pagination-params';

import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';

import { PrismaService } from '../prisma.service';
import { PrismaAnswerCommentMapper } from '../mappers/prisma-answer-comment-mapper';

@Injectable()
export class PrismaAnswerCommentsRepository implements AnswerCommentsRepository {
  constructor(
    private prisma: PrismaService,
  ) { }

  async findById(id: string) {
    const answerComment = await this.prisma.comment.findUnique({
      where: {
        id,
      }
    });

    if (!answerComment) return null;

    return PrismaAnswerCommentMapper.toDomain(answerComment);
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const comments = await this.prisma.comment.findMany({
      where: {
        answerId: answerId,
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return comments.map(PrismaAnswerCommentMapper.toDomain);
  }

  async create(answerComment: AnswerComment) {
    const data = PrismaAnswerCommentMapper.toPersistence(answerComment);

    await this.prisma.comment.create({
      data,
    });
  }

  async delete(answerComment: AnswerComment) {
    const data = PrismaAnswerCommentMapper.toPersistence(answerComment);

    await this.prisma.comment.delete({
      where: {
        id: data.id,
      }
    });
  }
}
