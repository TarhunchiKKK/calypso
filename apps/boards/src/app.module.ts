import { Module } from "@nestjs/common";
import { BoardsModule } from "./boards/boards.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import {mongooseConfigFactoryCreator } from "@repo/api"

@Module({
    imports: [
        CqrsModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: mongooseConfigFactoryCreator("BOARDS")
        }),
        BoardsModule
    ]
})
export class AppModule {}
