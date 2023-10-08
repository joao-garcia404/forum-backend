import { BadRequestException, Body, ConflictException, Controller, Post, UsePipes } from '@nestjs/common';

import { Public } from '@/infra/auth/public';

import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student';

import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

import { z } from 'zod';
import { StudentAlreadyExistsError } from '@/domain/forum/application/use-cases/errors/student-already-exists-error';

const createAccountSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateAccountSchema = z.infer<typeof createAccountSchema>;

@Public()
@Controller('/accounts')
export class CreateAccountController {
  constructor(
    private registerStudent: RegisterStudentUseCase
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  async handle(@Body() body: CreateAccountSchema) {
    const { name, email, password } = body;

    const result = await this.registerStudent.execute({
      name,
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
      case StudentAlreadyExistsError:
        throw new ConflictException(error.message);

      default:
        throw new BadRequestException(error.message);
      }
    }
  }
}
