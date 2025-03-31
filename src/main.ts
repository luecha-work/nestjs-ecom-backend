import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import * as swaggerUi from 'swagger-ui-express';
import { SwaggerDoc } from './doc/swagger.doc';

async function bootstrap() {
  const port = process.env.PORT;
  // const origin_cors_port = process.env.ORIGIN_CORS_PORT;

  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: `${process.env.CORS_ORIGIN}`,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
  
  new SwaggerDoc().setupDocs(app, port);

  await app.listen(port);
  logger.log(
    `Application listening on port ${port}, Origin cors url on ${process.env.CORS_ORIGIN}`,
  );
}

bootstrap();
