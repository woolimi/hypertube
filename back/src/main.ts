import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    cors: {
      origin: process.env.FRONT_HOST,
      credentials: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      // ref: https://darrengwon.tistory.com/848
      whitelist: true, // decorator(@)가 없는 속성이 들어오면 해당 속성은 제거하고 받아들입니다.
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 값이 넘어오면 request 자체를 막습니다.
      transform: true, // 클라이언트에서 값을 받자마자 타입을 정의한대로 자동 형변환을 합니다.
      transformOptions: { enableImplicitConversion: true },
    }),
  );

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
