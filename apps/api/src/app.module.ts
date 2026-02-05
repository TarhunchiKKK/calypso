import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { ClientsModule } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { mongooseConfigFactory } from "./config/mongoose.config-factory";
import { rabbitMqConfigFactory } from "./config/rabbit-mq.config-factory";
import { typeOrmConfigFactory } from "./config/typeorm.config-factory";
import { BoardsModule } from "./modules/boards/boards.module";
import { NodesModule } from "./modules/nodes/nodes.module";
import { RMQ_INJECTION_TOKEN } from "./shared/messages";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CqrsModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: typeOrmConfigFactory
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: mongooseConfigFactory
        }),
        ClientsModule.registerAsync([
            {
                name: RMQ_INJECTION_TOKEN,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: rabbitMqConfigFactory
            }
        ]),
        BoardsModule,
        NodesModule
    ]
})
export class AppModule {}
