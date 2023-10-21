import { Module } from '@nestjs/common';

import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository';

import { PrismaService } from './prisma/prisma.service';

import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository';
import { PrismaQuestionsAttachments } from './prisma/repositories/prisma-question-attachments-repository';
import { PrismaQuestionsComments } from './prisma/repositories/prisma-question-comments-repository';
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repoository';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository';
import { PrismaStudentsRepository } from './prisma/repositories/prisma-student-repository';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/questions-attachments-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionsAttachments
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionsComments
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswersRepository
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository
    },
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    QuestionAttachmentsRepository,
    QuestionCommentsRepository,
    AnswersRepository,
    AnswerCommentsRepository,
    AnswerAttachmentsRepository,
    StudentsRepository
  ]
})
export class DatabaseModule {}
