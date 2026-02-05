import type { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication) {
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
