import { type INestApplication, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import type { MicroserviceOptions } from "@nestjs/microservices";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { rabbitMqConfigFactory } from "./config/rabbit-mq.config-factory";

function setupSwagger(app: INestApplication) {
    const configService = app.get(ConfigService);

    const config = new DocumentBuilder()
        .setTitle(configService.getOrThrow("SWAGGER_TITLE"))
        .setDescription(configService.getOrThrow("SWAGGER_DESCRIPTION"))
        .setVersion(configService.getOrThrow("SWAGGER_VERSION"))
        .addTag(configService.getOrThrow("SWAGGER_TAG"))
        .build();

    SwaggerModule.setup(configService.getOrThrow("SWAGGER_PATH"), app, () => SwaggerModule.createDocument(app, config), {
        jsonDocumentUrl: configService.getOrThrow("SWAGGER_JSON_PATH"),
        yamlDocumentUrl: configService.getOrThrow("SWAGGER_YAML_PATH")
    });
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    setupSwagger(app);

    app.enableCors();

    app.connectMicroservice<MicroserviceOptions>(rabbitMqConfigFactory(configService));

    await app.startAllMicroservices();

    await app.listen(+configService.getOrThrow("API_PORT"));

    Logger.log(`Server is running on: ${await app.getUrl()}`);
}

void bootstrap();
