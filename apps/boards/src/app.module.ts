import { CacheModule, cacheConfigFactory } from "@api/cache";
import { AccessRightsModule, mongooseConfigFactory, rmqClientConfigFactory, typeormConfigFactory } from "@api/common";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { ClientsModule } from "@nestjs/microservices";
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
                    useFactory: rmqClientConfigFactory
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
