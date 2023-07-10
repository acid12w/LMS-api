import * as dotenv from 'dotenv'
dotenv.config() 
import { Express } from 'express'
import * as session from 'express-session';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 3001;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, 
    }),
  );
  app.enableCors({
    origin: ['http://localhost:3000', 'https://lms-59bg.onrender.com'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',    
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(PORT);
}
bootstrap();
