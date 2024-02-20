import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import type { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    cors: {
      origin: process.env.FRONT_HOST,
      credentials: true,
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Hypertube API')
    .setDescription('API Documentation for Hypertube.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  app.useBodyParser('json', { limit: '10mb' });
  await app.listen(3005);
}
bootstrap();
