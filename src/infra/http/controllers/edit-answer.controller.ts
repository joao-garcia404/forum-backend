import { BadRequestException, Body, Controller, HttpCode, Param, Put } from '@nestjs/common';

import { z } from 'zod';

import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';

import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer';

import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const editAnswerSchema = z.object({
  content: z.string(),
});

type EditAnswerSchema = z.infer<typeof editAnswerSchema>;

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(
   private editAnswer: EditAnswerUseCase,
  ) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(new ZodValidationPipe(editAnswerSchema)) body: EditAnswerSchema,
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string
  ) {
    const { sub } = user;
    const { content } = body;

    const result = await this.editAnswer.execute({
      content,
      authorId: sub,
      answerId,
      attachmentsIds: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
