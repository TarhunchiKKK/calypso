import { brokerMicroserviceConfigFactory } from "@contracts/broker";
import { BOARD_NODES_PACKAGE_NAME, BOARDS_PACKAGE_NAME, GrpcLoaderOptions } from "@contracts/grpc";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { type MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: BOARDS_PACKAGE_NAME,
            protoPath: "node_modules/@contracts/grpc/proto/boards/boards.service.proto",
            url: configService.getOrThrow<string>("BOARDS_GRPC_URL"),
            loader: GrpcLoaderOptions
        }
    });

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: BOARD_NODES_PACKAGE_NAME,
            protoPath: "node_modules/@contracts/grpc/proto/boards/nodes.service.proto",
            url: configService.getOrThrow<string>("BOARD_NODES_GRPC_URL"),
            loader: GrpcLoaderOptions
        }
    });

    app.connectMicroservice<MicroserviceOptions>(brokerMicroserviceConfigFactory(configService) as any);

    await app.init();

    await app.startAllMicroservices();

    Logger.log("Boards service is running");
}

void bootstrap();
