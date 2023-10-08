import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { hash } from 'bcryptjs';
import request from 'supertest';

import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Authenticate (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[POST] /sessions', async () => {
    await prisma.user.create({
      data: {
        name: 'user-test',
        email: 'test@email.com',
        password: await hash('123456', 8),
      }
    });

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'test@email.com',
      password: '123456',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      accessToken: expect.any(String)
    });
  });
});
