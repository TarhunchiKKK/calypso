import { CacheModule, cacheConfigFactory } from "@api/cache";
import { AccessRightsModule, mongooseConfigFactory, typeormConfigFactory } from "@api/common";
import { CommonBrokerOptions } from "@contracts/broker";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardsModule } from "./boards/boards.module";
import { Board } from "./boards/entities/board.entity";
import { AccessRightsRecord } from "./lib/auth.constants";
import { RMQ_CLIENT_INJECTION_TOKEN } from "./lib/rmq.constants";
import { NodesModule } from "./nodes/nodes.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CqrsModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: typeormConfigFactory([Board])
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: mongooseConfigFactory
        }),
        CacheModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: cacheConfigFactory
        }),
        ClientsModule.registerAsync({
            isGlobal: true,
            clients: [
                {
                    name: RMQ_CLIENT_INJECTION_TOKEN,
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => ({
                        name: RMQ_CLIENT_INJECTION_TOKEN,
                        transport: Transport.RMQ,
                        options: {
                            ...CommonBrokerOptions,
                            urls: configService.getOrThrow<string>("RMQ_URLS").split(","),
                            queue: configService.getOrThrow<string>("RMQ_QUEUE")
                        }
                    })
                }
            ]
        }),
        AccessRightsModule.forRoot({
            connectionName: "default",
            rules: AccessRightsRecord
        }),
        BoardsModule,
        NodesModule
    ]
})
export class AppModule {}
