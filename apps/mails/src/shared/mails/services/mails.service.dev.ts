import { Injectable, Logger } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import { Resend } from "resend";
import type { SendMailDto } from "../dto/send-mail.dto";
import type { IMailsService } from "../interfaces/mails.service.interface";

@Injectable()
export class MailsServiceDev implements IMailsService {
    private readonly resend: Resend;

    private readonly from: string;

    public constructor(private readonly configService: ConfigService) {
        const key = this.configService.getOrThrow<string>("MAIL_KEY");
        this.resend = new Resend(key);

        this.from = this.configService.getOrThrow<string>("MAIL_FROM");
    }

    public async sendMail(dto: SendMailDto) {
        try {
            await this.resend.emails.send({
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
