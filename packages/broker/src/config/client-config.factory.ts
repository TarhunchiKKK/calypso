import type { ConfigService } from "@nestjs/config";
import { type ClientProvider, Transport } from "@nestjs/microservices";
import { CommonBrokerOptions } from "entry";

export function rmqClientConfigFactory(configService: ConfigService): ClientProvider {
    const urls = configService.getOrThrow<string>("RMQ_URLS").split(",");
    const queue = configService.getOrThrow<string>("RMQ_QUEUE");

    return {
        transport: Transport.RMQ,
        options: {
            ...CommonBrokerOptions,
            urls,
            queue
        }
    };
}
