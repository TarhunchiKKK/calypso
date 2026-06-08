import type { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication) {
    const configService = app.get(ConfigService);

    const builder = new DocumentBuilder();
    builder.setTitle(configService.getOrThrow<string>("SWAGGER_TITLE"));
    builder.setDescription(configService.getOrThrow<string>("SWAGGER_DESCRIPTION"));
    builder.setVersion(configService.getOrThrow<string>("SWAGGER_VERSION"));

    configService
        .getOrThrow<string>("SWAGGER_TAGS")
        .split(",")
        .forEach((tag) => {
            builder.addTag(tag);
        });

    const config = builder.build();

    SwaggerModule.setup(configService.getOrThrow<string>("SWAGGER_PATH"), app, () => SwaggerModule.createDocument(app, config));
}
