import { rmqMicroserviceConfigFactory } from "@api/common";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { type MicroserviceOptions, Transport } from "@nestjs/microservices";
import { BOARD_NODES_PACKAGE_NAME, BOARDS_PACKAGE_NAME, GrpcLoaderOptions } from "@api/contracts";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: BOARDS_PACKAGE_NAME,
            protoPath: "node_modules/@api/contracts/proto/boards.service.proto",
            url: configService.getOrThrow<string>("BOARDS_GRPC_URL"),
            loader: GrpcLoaderOptions
        }
    });

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: BOARD_NODES_PACKAGE_NAME,
            protoPath: "node_modules/@api/contracts/proto/nodes.service.proto",
            url: configService.getOrThrow<string>("BOARD_NODES__GRPC_URL"),
            loader: GrpcLoaderOptions
        }
    });

    app.connectMicroservice<MicroserviceOptions>(rmqMicroserviceConfigFactory(configService));

    await app.init();

    await app.startAllMicroservices();

    Logger.log("Boards service is running");
}

void bootstrap();
