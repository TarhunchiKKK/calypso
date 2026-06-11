import { MailerModule } from "@nestjs-modules/mailer";
import { Global, Module } from "@nestjs/common";
import { MailsService } from "./services/mails.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { selectMailsService } from "./di/select-mails-service.di";

@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.getOrThrow<string>("MAIL_HOST"),
                    port: configService.getOrThrow<number>("MAIL_PORT"),
                    auth: {
                        user: configService.getOrThrow<string>("MAIL_LOGIN"),
                        pass: configService.getOrThrow<string>("MAIL_PASSWORD")
                    }
                },
                defaults: {
                    from: `"Calypso Team" ${configService.getOrThrow<string>("MAIL_FROM")}`
                }
            })
        })
    ],
    providers: [
        {
            provide: MailsService,
            useClass: selectMailsService()
        }
    ],
    exports: [MailsService]
})
export class MailsModule {}
