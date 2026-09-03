import type { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SwaggerTags } from "./swagger.constants";

export function setupSwagger(app: INestApplication) {
    const configService = app.get(ConfigService);
    const swaggerPath = configService.getOrThrow<string>("SWAGGER_PATH");

    const builder = new DocumentBuilder();
    builder.setTitle(configService.getOrThrow<string>("SWAGGER_TITLE"));
    builder.setDescription(configService.getOrThrow<string>("SWAGGER_DESCRIPTION"));
    builder.setVersion(configService.getOrThrow<string>("SWAGGER_VERSION"));

    builder.addTag(SwaggerTags.auth.name, SwaggerTags.auth.description, undefined, { kind: "group" });
    builder.addTag(SwaggerTags.auth.children.users.name, SwaggerTags.auth.children.users.description, undefined, { parent: SwaggerTags.auth.name });
    builder.addTag(SwaggerTags.auth.children.basic.name, SwaggerTags.auth.children.basic.description, undefined, { parent: SwaggerTags.auth.name });
    builder.addTag(SwaggerTags.auth.children.emailVerification.name, SwaggerTags.auth.children.emailVerification.description, undefined, {
        parent: SwaggerTags.auth.children.basic.name
    });
    builder.addTag(SwaggerTags.auth.children.passwordRecovery.name, SwaggerTags.auth.children.passwordRecovery.description, undefined, {
        parent: SwaggerTags.auth.children.basic.name
    });
    builder.addTag(SwaggerTags.projects.name, SwaggerTags.projects.description);
    builder.addTag(SwaggerTags.boards.name, SwaggerTags.boards.description, undefined, { kind: "group" });
    builder.addTag(SwaggerTags.boards.children.management.name, SwaggerTags.boards.children.management.description, undefined, {
        parent: SwaggerTags.boards.name
    });
    builder.addTag(SwaggerTags.boards.children.nodes.name, SwaggerTags.boards.children.nodes.description, undefined, { parent: SwaggerTags.boards.name });
    builder.addTag(SwaggerTags.media.name, SwaggerTags.media.description);

    const config = builder.build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(swaggerPath, app, document, {
        jsonDocumentUrl: `${swaggerPath}/swagger.json`,
        yamlDocumentUrl: `${swaggerPath}/swagger.yaml`
    });
}
