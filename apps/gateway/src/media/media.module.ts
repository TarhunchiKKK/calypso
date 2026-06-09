import { GrpcLoaderOptions, MEDIA_PACKAGE_NAME } from "@api/contracts";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MEDIA_GRPC_CLIENT_INJECTION_TOKEN } from "./lib/grpc.constants";
import { MediaController } from "./media.controller";
import { MediaService } from "./media.service";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: MEDIA_GRPC_CLIENT_INJECTION_TOKEN,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: MEDIA_PACKAGE_NAME,
                        protoPath: "node_modules/@api/contracts/proto/media/media.service.proto",
                        url: configService.getOrThrow<string>("MEDIA_SERVICE_GRPC_URL"),
                        loader: GrpcLoaderOptions
                    }
                })
            }
        ])
    ],
    controllers: [MediaController],
    providers: [MediaService]
})
export class MediaModule {}
