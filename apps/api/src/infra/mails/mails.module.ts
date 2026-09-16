import { Global, Module, type Type } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { MailerConfigService } from "src/config";
import { dependsOnEnv } from "../../../../../packages/lib/common/dist/cjs/entry";
import { MailsService } from "./services/mails.service";
import { MailsServiceDev } from "./services/mails.service.dev";

@Global()
@Module({
    imports: [MailerModule.forRootAsync({ useClass: MailerConfigService })],
    providers: [
        {
            provide: MailsService,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return dependsOnEnv<Type>(configService.getOrThrow("NODE_ENV"), {
                    prod: MailsService,
                    dev: MailsServiceDev
                });
            }
        }
    ],
    exports: [MailsService]
})
export class MailsModule {}
