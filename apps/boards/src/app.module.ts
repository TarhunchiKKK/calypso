import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { mongooseConfigFactory } from "@repo/api";
import { BoardsModule } from "./boards/boards.module";
import { NodesModule } from "./nodes/nodes.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        CqrsModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: mongooseConfigFactory("BOARDS")
        }),
        BoardsModule,
        NodesModule
    ]
})
export class AppModule {}
