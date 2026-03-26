import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { ClientsModule } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessRightsModule, mongooseConfigFactory, rmqClientConfigFactory, typeormConfigFactory } from "@repo/api";
import { BoardsModule } from "./boards/boards.module";
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
            useFactory: typeormConfigFactory
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: mongooseConfigFactory
        }),
        ClientsModule.registerAsync({
            isGlobal: true,
            clients: [
                {
                    name: RMQ_CLIENT_INJECTION_TOKEN,
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    // biome-ignore lint/suspicious/noExplicitAny: different project have different `@nestjs/microservices` hash
                    useFactory: rmqClientConfigFactory as any
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
