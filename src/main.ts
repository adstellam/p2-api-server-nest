import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('Stout API')
        .setDescription('')
        .setVersion('1.0')
        .addTag('')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.enableCors({
        credentials: true
    });
    app.useGlobalFilters(new HttpExceptionFilter(new Logger()));
    await app.listen(3000);
}
bootstrap();
