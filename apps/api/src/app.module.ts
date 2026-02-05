import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { mongooseConfigFactory } from "./config/mongoose.config";
import { typeOrmConfigFactory } from "./config/typeorm.config";
import { BoardsModule } from "./modules/boards/boards.module";
import { NodesModule } from "./modules/nodes/nodes.module";

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

        BoardsModule,
        NodesModule
    ]
})
export class AppModule {}
