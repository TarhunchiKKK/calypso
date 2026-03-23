import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CommonBrokerOptions } from "@repo/api";
import { BoardsController } from "./boards/boards.controller";
import { BoardsHttpService } from "./boards/boards.http.service";
import { BOARDS_RMQ_CLIENT_INJECTION_TOKEN } from "./lib/rmq.constants";
import { NodesController } from "./nodes/nodes.controller";
import { NodesHttpService } from "./nodes/nodes.http.service";
import { NodesBrokerAcknowledgementService } from "./nodes/nodes.rmq.service";

@Module({
    imports: [
        HttpModule,
        ClientsModule.registerAsync([
            {
                name: BOARDS_RMQ_CLIENT_INJECTION_TOKEN,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        ...CommonBrokerOptions,
                        urls: configService.getOrThrow<string>("RMQ_URLS").split(","),
                        queue: configService.getOrThrow<string>("BOARDS_RMQ_QUEUE")
                    }
                })
            }
        ])
    ],
    controllers: [BoardsController, NodesController],
    providers: [BoardsHttpService, NodesHttpService, NodesBrokerAcknowledgementService]
})
export class BoardsModule {}
