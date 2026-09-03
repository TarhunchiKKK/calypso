import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { EmailVerificationTemplate } from "../templates/email-verification.template";
import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { render } from "@react-email/components";
import { MailsService } from "src/infra/mails/services/mails.service";

export class SendEmailVerificationCommand extends Command<void> {
    public constructor(public dto: EmailVerificationBrokerMessage) {
        super();
    }
}

@CommandHandler(SendEmailVerificationCommand)
export class SendEmailVerificationCommandHandler implements ICommandHandler<SendEmailVerificationCommand> {
    private readonly baseUrl: string;

    public constructor(
        @Inject(ConfigService) private readonly configService: ConfigService,
        @Inject(MailsService) private readonly mailsService: MailsService
    ) {
        this.baseUrl = this.configService.getOrThrow("WEB_URL");
    }

    public async execute({ dto: { user, token } }: SendEmailVerificationCommand) {
        const template = EmailVerificationTemplate({
            baseUrl: this.baseUrl,
            token: token
        });

        const html = await render(template);

        await this.mailsService.sendMail({
            to: user.email,
            subject: "Email Verification",
            html: html
        });
    }
}
