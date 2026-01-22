import type { INestApplication } from "@nestjs/common";
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

    setupSwagger(app);

    app.enableCors();

    await app.listen(3000);
}

void bootstrap();
