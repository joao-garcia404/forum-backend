import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

import { z } from 'zod';

import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';

import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';

import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const createQuestionSchema = z.object({
  title: z.string(),
  content: z.string(),
});

type CreateQuestionSchema = z.infer<typeof createQuestionSchema>;

@Controller('/questions')
export class CreateQuestionController {
  constructor(
   private createQuestion: CreateQuestionUseCase,
  ) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createQuestionSchema)) body: CreateQuestionSchema,
    @CurrentUser() user: UserPayload
  ) {
    const { sub } = user;
    const { title, content } = body;

    const result = await this.createQuestion.execute({
      title,
      content,
      authorId: sub,
      attachmentsIds: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
