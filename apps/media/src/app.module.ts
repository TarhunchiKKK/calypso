import { CacheModule, cacheConfigFactory } from "@api/cache";
import { typeormConfigFactory } from "@api/common";
import { LoggerModule, lokiLoggerConfigFactory } from "@api/logs";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Media } from "./media/entities/media.entity";
import { MediaGroup } from "./media/entities/media-group.entity";
import { MediaModule } from "./media/media.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CqrsModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: typeormConfigFactory([Media, MediaGroup])
        }),
        CacheModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: cacheConfigFactory
        }),
        LoggerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: lokiLoggerConfigFactory
        }),
        MediaModule
    ],
    providers: [Reflector]
})
export class AppModule {}
