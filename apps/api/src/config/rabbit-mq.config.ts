import type { ConfigService } from "@nestjs/config";
import { type RmqOptions, Transport } from "@nestjs/microservices";

export function rabbitMqConfigFactory(configService: ConfigService): RmqOptions {
    return {
        transport: Transport.RMQ,
        options: {
            queue: configService.getOrThrow("RABBIT_MQ_QUEUE"),
            urls: [configService.getOrThrow<string>("RABBIT_MQ_URL")],
            queueOptions: {
                durable: false
            }
        }
    };
}
