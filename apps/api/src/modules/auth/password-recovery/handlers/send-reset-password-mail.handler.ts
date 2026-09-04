import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { render } from "@react-email/components";
import { MailsService } from "src/infra/mails/services/mails.service";
import { ResetPasswordTemplate } from "../../email-verification/templates/reset-password.template";
import type { SendResetPasswordMailQueueData } from "../lib/bullmq.lib";

export class SendResetPasswordMailCommand extends Command<void> {
    public constructor(public dto: SendResetPasswordMailQueueData) {
        super();
    }
}

@CommandHandler(SendResetPasswordMailCommand)
export class SendResetPasswordMailCommandHandler implements ICommandHandler<SendResetPasswordMailCommand> {
    private readonly baseUrl: string;

    public constructor(
        @Inject(ConfigService) private readonly configService: ConfigService,
        @Inject(MailsService) private readonly mailsService: MailsService
    ) {
        this.baseUrl = this.configService.getOrThrow("WEB_URL");
    }

    public async execute({ dto }: SendResetPasswordMailCommand) {
        const template = ResetPasswordTemplate({
            baseUrl: this.baseUrl,
            token: dto.token
        });

        const html = await render(template);

        await this.mailsService.sendMail({
            to: dto.email,
            subject: "Password Recovery",
            html: html
        });
    }
}
