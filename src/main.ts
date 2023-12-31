import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerLoader } from './utils/loaders';
import { ValidationPipe } from '@nestjs/common';
import { env } from './env';
import { ExceptionHandlerFilter } from './utils/error/exception-handler.filter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useBodyParser('json', { limit: '2mb' });
  swaggerLoader(app);
  app.useGlobalFilters(new ExceptionHandlerFilter());
  await app.listen(env.port);
}
bootstrap();
