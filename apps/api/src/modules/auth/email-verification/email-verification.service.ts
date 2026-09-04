import type { Id } from "@lib/common";
import { Inject, Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import type { SendEmailVerificationMailDto } from "./dto/send-email-verification-mail.dto";
import { SendEmailVerificationCommand } from "./handlers/send-email-verification.handler";
import { SendEmailVerificationMailCommand } from "./handlers/send-email-verification-mail.handler";
import { VerifyEmailCommand } from "./handlers/verify-email.handler";

@Injectable()
export class EmailVerificationService {
    public constructor(@Inject(CommandBus) private readonly commandBus: CommandBus) {}

    public async send(userId: Id) {
        await this.commandBus.execute(new SendEmailVerificationCommand(userId));
    }

    public async sendMail(dto: SendEmailVerificationMailDto) {
        await this.commandBus.execute(new SendEmailVerificationMailCommand(dto));
    }

    public async verify(userId: Id, token: string) {
        await this.commandBus.execute(new VerifyEmailCommand(userId, token));
    }
}
