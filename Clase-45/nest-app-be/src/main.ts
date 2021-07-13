import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Mi API con NEST')
    .setDescription('Descripcion de mi API')
    .setVersion('1.0')
    .build()
    
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/docs', app, document, {
    explorer: false,
    swaggerOptions: {
      filter: true,
    }
  })
  await app.listen(3000);
}
bootstrap();
