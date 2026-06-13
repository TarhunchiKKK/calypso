import { CacheModule, cacheConfigFactory } from "@api/cache";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { AuthModule } from "./modules/auth/auth.module";
import { MailsModule } from "./shared/mails/mails.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CqrsModule.forRoot(),
        CacheModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: cacheConfigFactory
        }),
        MailsModule,
        AuthModule
    ]
})
export class AppModule {}
