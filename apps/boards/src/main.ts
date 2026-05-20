import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { type MicroserviceOptions, Transport } from "@nestjs/microservices";
import { rmqMicroserviceConfigFactory } from "@repo/api";
import { BOARDS_PACKAGE_NAME, GrpcLoaderOptions } from "@repo/contracts";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: BOARDS_PACKAGE_NAME,
            protoPath: "node_modules/@repo/contracts/proto/boards.proto",
            url: configService.getOrThrow<string>("GRPC_URL"),
            loader: GrpcLoaderOptions
        }
    });

    app.connectMicroservice<MicroserviceOptions>(rmqMicroserviceConfigFactory(configService));

    await app.init();

    await app.startAllMicroservices();

    Logger.log("Boards service is running");
}

void bootstrap();
