import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailerService } from "@nestjs-modules/mailer";
import type { SendMailDto } from "../dto/send-mail.dto";
import type { IMailsService } from "../interfaces/mails.service.interface";

@Injectable()
export class MailsService implements IMailsService {
    private readonly from: string;

    public constructor(
        @Inject(MailerService) private readonly mailerService: MailerService,
        @Inject(ConfigService) private readonly configService: ConfigService
    ) {
        this.from = this.configService.getOrThrow<string>("MAIL_FROM");
    }

    public async sendMail(dto: SendMailDto) {
        try {
            await this.mailerService.sendMail({
                from: this.from,
                to: dto.to,
                subject: dto.subject,
                html: dto.html
            });
        } catch (error) {
            Logger.error(error);
        }
    }
}
