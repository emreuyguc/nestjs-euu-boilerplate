import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import {
  AppConfigKey,
  IAppConfig,
} from './core/shared/data/configs/app.config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    CoreModule,
    new FastifyAdapter(),
  );

  //TODO MAYBE IN MODULE
  //TODO VALIDATOR CHECK
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(CoreModule), { fallbackOnErrors: true });

  //TODO CONFIG SET
  const swaggerConfig = new DocumentBuilder()
    .setTitle('REST API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  const appConfig = app.get(ConfigService).get<IAppConfig>(AppConfigKey);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(appConfig.SWAGGER_PATH, app, document);

  await app.listen(appConfig.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
