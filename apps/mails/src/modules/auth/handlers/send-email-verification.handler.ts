import type { EmailVerificationBrokerMessage } from "@contracts/broker";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { render } from "@react-email/components";
import { SendMailCommandHandler } from "src/shared/core";
import { EmailVerificationTemplate } from "../templates/email-verification.template";

export class SendEmailVerificationCommand extends Command<void> {
    public constructor(public dto: EmailVerificationBrokerMessage) {
        super();
    }
}

@CommandHandler(SendEmailVerificationCommand)
export class SendEmailVerificationCommandHandler extends SendMailCommandHandler implements ICommandHandler<SendEmailVerificationCommand> {
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
