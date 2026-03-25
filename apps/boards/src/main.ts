import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { type MicroserviceOptions, Transport } from "@nestjs/microservices";
import { GrpcGen, rmqMicroserviceConfigFactory } from "@repo/api";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: GrpcGen.Boards.BOARDS_PACKAGE_NAME
        }
    });

    app.connectMicroservice<MicroserviceOptions>(rmqMicroserviceConfigFactory(configService));

    await app.startAllMicroservices();

    await app.init();
}

void bootstrap();
