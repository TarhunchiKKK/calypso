import type { ResetPasswordBrokerMessage } from "@contracts/broker";
import { Command, CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { render } from "@react-email/components";
import { SendMailCommandHandler } from "src/shared/core";
import { ResetPasswordTemplate } from "../templates/reset-password.template";

export class SendResetPasswordCommand extends Command<void> {
    public constructor(public dto: ResetPasswordBrokerMessage) {
        super();
    }
}

@CommandHandler(SendResetPasswordCommand)
export class SendResetPasswordCommandHandler extends SendMailCommandHandler implements ICommandHandler<SendResetPasswordCommand> {
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
