import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { type MicroserviceOptions, Transport } from "@nestjs/microservices";
import { GrpcLoaderOptions, MEDIA_PACKAGE_NAME } from "@repo/contracts";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: MEDIA_PACKAGE_NAME,
            protoPath: "node_modules/@repo/contracts/proto/media.proto",
            url: configService.getOrThrow<string>("GRPC_URL"),
            loader: GrpcLoaderOptions
        }
    });

    await app.init();

    await app.startAllMicroservices();

    Logger.log("Media service is running");
}

void bootstrap();
