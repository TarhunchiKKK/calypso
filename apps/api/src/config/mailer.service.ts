import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { MailerOptions, MailerOptionsFactory } from "@nestjs-modules/mailer";

@Injectable()
export class MailerConfigService implements MailerOptionsFactory {
    public constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

    public createMailerOptions(): MailerOptions {
        return {
            transport: {
                host: this.configService.getOrThrow<string>("MAIL_HOST"),
                port: this.configService.getOrThrow<number>("MAIL_PORT"),
                auth: {
                    user: this.configService.getOrThrow<string>("MAIL_LOGIN"),
                    pass: this.configService.getOrThrow<string>("MAIL_PASSWORD")
                }
            },
            defaults: {
                from: `"Calypso Team" ${this.configService.getOrThrow<string>("MAIL_FROM")}`
            }
        };
    }
}
