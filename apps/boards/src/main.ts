import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { type MicroserviceOptions, Transport } from "@nestjs/microservices";
import { CommonRmqOptions } from "@repo/api";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            ...CommonRmqOptions,
            urls: configService.getOrThrow<string>("RMQ_URLS").split(","),
            queue: configService.getOrThrow<string>("RMQ_QUEUE")
        }
    });

    await app.startAllMicroservices();

    await app.init();
}

void bootstrap();
