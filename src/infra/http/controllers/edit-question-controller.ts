import { BadRequestException, Body, Controller, HttpCode, Param, Put } from '@nestjs/common';

import { z } from 'zod';

import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';

import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question';

import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const editQuestionSchema = z.object({
  title: z.string(),
  content: z.string(),
});

type EditQuestionSchema = z.infer<typeof editQuestionSchema>;

@Controller('/questions/:id')
export class EditQuestionController {
  constructor(
   private editQuestion: EditQuestionUseCase,
  ) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(new ZodValidationPipe(editQuestionSchema)) body: EditQuestionSchema,
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string
  ) {
    const { sub } = user;
    const { title, content } = body;

    const result = await this.editQuestion.execute({
      title,
      content,
      authorId: sub,
      questionId,
      attachmentsIds: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
