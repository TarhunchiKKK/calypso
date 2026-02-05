import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import type { MicroserviceOptions } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { rabbitMqConfigFactory } from "./config/rabbit-mq.config";
import { setupSwagger } from "./config/swagger.config";

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
