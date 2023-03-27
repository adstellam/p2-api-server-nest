"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const http_exception_filter_1 = require("./http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Stout API')
        .setDescription('')
        .setVersion('1.0')
        .addTag('')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors({
        credentials: true
    });
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(new common_1.Logger()));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map