import { Injectable } from '@nestjs/common';

import { Answer } from '@/domain/forum/enterprise/entities/answer';

import { PaginationParams } from '@/core/repositories/pagination-params';

import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';

import { PrismaService } from '../prisma.service';

import { PrismaAnswerMapper } from '../mappers/prisma-answer-mapper';

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(
    private prisma: PrismaService,
  ) { }

  async findById(id: string) {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      }
    });

    if (!answer) return null;

    return PrismaAnswerMapper.toDomain(answer);
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = await this.prisma.answer.findMany({
      where: {
        questionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return answers.map(PrismaAnswerMapper.toDomain);
  }

  async create(answer: Answer) {
    const data = PrismaAnswerMapper.toPersistence(answer);

    await this.prisma.answer.create({
      data,
    });
  }

  async save(answer: Answer) {
    const data = PrismaAnswerMapper.toPersistence(answer);

    await this.prisma.answer.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async delete(answer: Answer) {
    const data = PrismaAnswerMapper.toPersistence(answer);

    await this.prisma.answer.delete({
      where: {
        id: data.id,
      }
    });
  }
}
