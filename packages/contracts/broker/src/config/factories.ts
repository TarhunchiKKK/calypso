import type { ConfigService } from "@nestjs/config";
import { type ClientProvider, type MicroserviceOptions, Transport } from "@nestjs/microservices";
import { CommonBrokerOptions } from "./constants";

export function brokerClientConfigFactory(configService: ConfigService): ClientProvider {
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

export function brokerMicroserviceConfigFactory(configService: ConfigService): MicroserviceOptions {
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
