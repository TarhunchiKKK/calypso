import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { type MicroserviceOptions, Transport } from "@nestjs/microservices";
import { BOARDS_PACKAGE_NAME, GrpcLoaderOptions, rmqMicroserviceConfigFactory } from "@repo/api";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: BOARDS_PACKAGE_NAME,
            protoPath: "node_modules/@repo/api/proto/boards.proto",
            url: configService.getOrThrow<string>("GRPC_URL"),
            loader: GrpcLoaderOptions
        }
    });

    // biome-ignore lint/suspicious/noExplicitAny: different project have different `@nestjs/microservices` hash
    app.connectMicroservice<MicroserviceOptions>(rmqMicroserviceConfigFactory(configService) as any);

    await app.init();

    await app.startAllMicroservices();

    Logger.log("Boards service is running");
}

void bootstrap();
