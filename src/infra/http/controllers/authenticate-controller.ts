import { BadRequestException, Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common';

import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student';

import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

import { z } from 'zod';
import { WrongCredentialsError } from '@/domain/forum/application/use-cases/errors/wrong-credentials-error';
import { Public } from '@/infra/auth/public';

const authenticateSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateSchema = z.infer<typeof authenticateSchema>;

@Public()
@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private authenticateStudent: AuthenticateStudentUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateSchema))
  async handle(@Body() body: AuthenticateSchema) {
    const { email, password } = body;

    const result = await this.authenticateStudent.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
      case WrongCredentialsError:
        throw new UnauthorizedException(error.message);

      default:
        throw new BadRequestException(error.message);
      }
    }

    const { accessToken } = result.value;

    return {
      accessToken,
    };
  }
}
