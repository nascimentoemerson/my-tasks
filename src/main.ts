import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My Tasks API')
    .setDescription('API for managing tasks')
    .setVersion('1.0')
    .addTag('tasks')
    .addBearerAuth()
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      securityDefinitions: {
        basicAuth: {
          type: 'basic',
          description: 'Basic authentication',
        },
      },
      security: [
        {
          basicAuth: [],
        },
      ],
    },
  });

  await app.listen(3000);
}
bootstrap();
