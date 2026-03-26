import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { BOARDS_PACKAGE_NAME, GrpcLoaderOptions } from "@repo/api";
import { BoardsController } from "./boards/boards.controller";
import { BoardsService } from "./boards/boards.service";
import { BOARDS_GRPC_CLIENT_INJECTION_TOKEN } from "./lib/grpc.constants";
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
                        protoPath: "node_modules/@repo/api/proto/boards.proto",
                        url: configService.getOrThrow<string>("BOARDS_SERVICE_GRPC_URL"),
                        loader: GrpcLoaderOptions
                    }
                })
            }
        ])
    ],
    controllers: [BoardsController, NodesController],
    providers: [BoardsService, NodesService]
})
export class BoardsModule {}
