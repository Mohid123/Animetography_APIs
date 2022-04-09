/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  const config = new DocumentBuilder()
    .setTitle('Menu')
    .setDescription('Menu API description')
    .setVersion('1.0')
    .addTag('menu')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  app.setGlobalPrefix('api');

  app.use(bodyParser.json({ limit: '500mb' }));

  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  });
}

bootstrap();
