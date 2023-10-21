import { BadRequestException, Body, Controller, Param, Post } from '@nestjs/common';

import { z } from 'zod';

import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';

import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';

import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const answerQuestionSchema = z.object({
  content: z.string(),
});

type AnswerQuestionSchema = z.infer<typeof answerQuestionSchema>;

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  constructor(
   private answerQuestion: AnswerQuestionUseCase,
  ) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(answerQuestionSchema)) body: AnswerQuestionSchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string
  ) {
    const { sub } = user;
    const { content } = body;

    const result = await this.answerQuestion.execute({
      content,
      questionId,
      authorId: sub,
      attachmentsIds: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
