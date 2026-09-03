import type { ResetPasswordBrokerMessage } from "@contracts/broker";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { render } from "@react-email/components";
import { ResetPasswordTemplate } from "../templates/reset-password.template";
import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailsService } from "src/infra/mails/services/mails.service";

export class SendResetPasswordCommand extends Command<void> {
    public constructor(public dto: ResetPasswordBrokerMessage) {
        super();
    }
}

@CommandHandler(SendResetPasswordCommand)
export class SendResetPasswordCommandHandler implements ICommandHandler<SendResetPasswordCommand> {
    private readonly baseUrl: string;

    public constructor(
        @Inject(ConfigService) private readonly configService: ConfigService,
        @Inject(MailsService) private readonly mailsService: MailsService
    ) {
        this.baseUrl = this.configService.getOrThrow("WEB_URL");
    }

    public async execute({ dto: { user, token } }: SendResetPasswordCommand) {
        const template = ResetPasswordTemplate({
            baseUrl: this.baseUrl,
            token: token
        });

        const html = await render(template);

        await this.mailsService.sendMail({
            to: user.email,
            subject: "Password Recovery",
            html: html
        });
    }
}
