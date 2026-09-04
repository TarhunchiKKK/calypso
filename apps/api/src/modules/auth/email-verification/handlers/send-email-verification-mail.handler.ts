import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { render } from "@react-email/components";
import { MailsService } from "src/infra/mails/services/mails.service";
import type { SendEmailVerificationMailDto } from "../dto/send-email-verification-mail.dto";
import { EmailVerificationTemplate } from "../templates/email-verification.template";

export class SendEmailVerificationMailCommand extends Command<void> {
    public constructor(public dto: SendEmailVerificationMailDto) {
        super();
    }
}

@CommandHandler(SendEmailVerificationMailCommand)
export class SendEmailVerificationMailCommandHandler implements ICommandHandler<SendEmailVerificationMailCommand> {
    private readonly baseUrl: string;

    public constructor(
        @Inject(ConfigService) private readonly configService: ConfigService,
        @Inject(MailsService) private readonly mailsService: MailsService
    ) {
        this.baseUrl = this.configService.getOrThrow("WEB_URL");
    }

    public async execute({ dto }: SendEmailVerificationMailCommand) {
        const template = EmailVerificationTemplate({
            baseUrl: this.baseUrl,
            token: dto.token
        });

        const html = await render(template);

        await this.mailsService.sendMail({
            to: dto.email,
            subject: "Email Verification",
            html: html
        });
    }
}
