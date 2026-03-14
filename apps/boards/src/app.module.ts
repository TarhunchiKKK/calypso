import { Module } from "@nestjs/common";
import { BoardsModule } from "./boards/boards.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { mongooseConfigFactory } from "@repo/api";
import { NodesModule } from "./nodes/nodes.module";

@Module({
    imports: [
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
