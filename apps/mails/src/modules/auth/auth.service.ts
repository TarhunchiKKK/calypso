import type { EmailVerificationBrokerMessage, ResetPasswordBrokerMessage } from "@contracts/broker";
import { Inject, Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { SendEmailVerificationCommand } from "./handlers/send-email-verification.handler";
import { SendResetPasswordCommand } from "./handlers/send-reset-password.handler";

@Injectable()
export class AuthService {
    public constructor(@Inject(CommandBus) private readonly commandBus: CommandBus) {}

    public async emailVerification(dto: EmailVerificationBrokerMessage) {
        return await this.commandBus.execute(new SendEmailVerificationCommand(dto));
    }

    public async resetPassword(dto: ResetPasswordBrokerMessage) {
        return await this.commandBus.execute(new SendResetPasswordCommand(dto));
    }
}
