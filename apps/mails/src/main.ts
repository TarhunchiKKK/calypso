import { AppLogger } from "@api/logs";
import { brokerMicroserviceConfigFactory } from "@contracts/broker";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import type { MicroserviceOptions } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true
    });

    const logger = app.get(AppLogger);
    app.useLogger(logger);

    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>(brokerMicroserviceConfigFactory(configService) as any);

    await app.init();

    await app.startAllMicroservices();

    Logger.log("Mails worker is running", "Workers");
}

void bootstrap();
