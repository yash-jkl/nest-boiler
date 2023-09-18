import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// eslint-disable-next-line func-names
export const swaggerLoader = function (app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Shop')
    .setDescription('Shop API Description')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/swagger', app, document);
};
