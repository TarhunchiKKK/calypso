import type { ConfigService } from "@nestjs/config";
import { type ClientProvider, type MicroserviceOptions, Transport } from "@nestjs/microservices";

export const CommonBrokerOptions = {
    queueOptions: {
        durable: true
    },
    noAck: true,
    prefetchCount: 1,
    persistent: true
};
