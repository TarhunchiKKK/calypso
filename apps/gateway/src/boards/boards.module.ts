import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { BOARD_NODES_PACKAGE_NAME, BOARDS_PACKAGE_NAME, GrpcLoaderOptions } from "@repo/contracts";
import { BoardsController } from "./boards/boards.controller";
import { BoardsService } from "./boards/boards.service";
import { BOARD_NODES_GRPC_CLIENT_INJECTION_TOKEN, BOARDS_GRPC_CLIENT_INJECTION_TOKEN } from "./lib/grpc.constants";
import { NodesController } from "./nodes/nodes.controller";
import { NodesService } from "./nodes/nodes.service";

@Module({
    imports: [
        HttpModule,
        ClientsModule.registerAsync([
            {
                name: BOARDS_GRPC_CLIENT_INJECTION_TOKEN,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: BOARDS_PACKAGE_NAME,
                        protoPath: "node_modules/@repo/contracts/proto/boards.service.proto",
                        url: configService.getOrThrow<string>("BOARDS_SERVICE_GRPC_URL"),
                        loader: GrpcLoaderOptions
                    }
                })
            },
            {
                name: BOARD_NODES_GRPC_CLIENT_INJECTION_TOKEN,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: BOARD_NODES_PACKAGE_NAME,
                        protoPath: "node_modules/@repo/contracts/proto/nodes.service.proto",
                        url: configService.getOrThrow<string>("BOARD_NODES_SERVICE_GRPC_URL"),
                        loader: GrpcLoaderOptions
                    }
                })
            }
        ])
    ],
    controllers: [BoardsController, NodesController],
    providers: [BoardsService, NodesService],
    exports: [BoardsService]
})
export class BoardsModule {}
