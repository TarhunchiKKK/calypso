import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfigFactory } from "./config/typeorm-config.factory";
import { BoardsModule } from "./modules/boards/boards.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CqrsModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: typeOrmConfigFactory
        }),
        BoardsModule
    ]
})
export class AppModule {}
