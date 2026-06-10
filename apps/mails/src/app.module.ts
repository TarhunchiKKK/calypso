import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CqrsModule.forRoot(),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.getOrThrow<string>("MAIL_HOST"),
                    port: configService.getOrThrow<number>("MAIL_PORT"),
                    secure: false,
                    auth: {
                        user: configService.getOrThrow<string>("MAIL_LOGIN"),
                        pass: configService.getOrThrow<string>("MAIL_PASSWORD")
                    }
                },
                defaults: {
                    from: `"Calypso" ${configService.getOrThrow<string>("MAIL_FROM")}`
                }
            })
        })
    ]
})
export class AppModule {}
