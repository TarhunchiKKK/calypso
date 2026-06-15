import { Global, Module, type Type } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { dependsOnEnv } from "../../../../../packages/lib/common/dist/cjs/entry";
import { MailsService } from "./services/mails.service";
import { MailsServiceDev } from "./services/mails.service.dev";

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
            useClass: dependsOnEnv<Type<any>>(process.env.NODE_ENV, {
                prod: MailsService,
                dev: MailsServiceDev
            })
        }
    ],
    exports: [MailsService]
})
export class MailsModule {}
