import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { mongooseConfigFactory, RmqModule } from "@repo/api";
import { BoardsModule } from "./boards/boards.module";
import { NodesModule } from "./nodes/nodes.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CqrsModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: mongooseConfigFactory("BOARDS")
        }),
        RmqModule,
        BoardsModule,
        NodesModule
    ]
})
export class AppModule {}
