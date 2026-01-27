import { type INestApplication, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder().setTitle("Calypso").setDescription("Calypso API documentation").setVersion("1.0").addTag("calypso").build();

    SwaggerModule.setup("swagger", app, () => SwaggerModule.createDocument(app, config), {
        jsonDocumentUrl: "swagger/json",
        yamlDocumentUrl: "swagger/yaml"
    });
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    setupSwagger(app);

    app.enableCors();

    await app.listen(+configService.getOrThrow("API_PORT"));

    Logger.log(`Server is running on: ${await app.getUrl()}`);
}

void bootstrap();
