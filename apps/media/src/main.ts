import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { type MicroserviceOptions, Transport } from "@nestjs/microservices";
import { BOARDS_PACKAGE_NAME, GrpcLoaderOptions } from "@repo/api";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: BOARDS_PACKAGE_NAME,
            protoPath: "node_modules/@repo/api/proto/media.proto",
            url: configService.getOrThrow<string>("GRPC_URL"),
            loader: GrpcLoaderOptions
        }
    });

    await app.startAllMicroservices();

    await app.init();
}

void bootstrap();
