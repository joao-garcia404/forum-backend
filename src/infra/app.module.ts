import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpModule } from './http/http.module';
import { AuthModule } from './auth/auth.module';
import { EnvModule } from './env/env.module';
import { envSchema } from './env/env';

@Module({
  imports: [
    AuthModule,
    HttpModule,
    EnvModule,
    ConfigModule.forRoot({
      validate: obj => envSchema.parse(obj),
      isGlobal: true,
    })],
  controllers: [],
})
export class AppModule {}
