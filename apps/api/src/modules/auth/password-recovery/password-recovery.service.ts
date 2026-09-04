import type { Id } from "@lib/common";
import { Inject, Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import type { SendResetPasswordMailDto } from "./dto/send-reset-password-mail.dto";
import { ResetPasswordCommand } from "./handlers/reset-password.handler";
import { SendResetPasswordMailCommand } from "./handlers/send-reset-password-mail.handler";
import { UpdatePasswordCommand } from "./handlers/update-password.handler";

@Injectable()
export class PasswordRecoveryService {
    public constructor(@Inject(CommandBus) private readonly commandBus: CommandBus) {}

    public async reset(userId: Id) {
        return await this.commandBus.execute(new ResetPasswordCommand(userId));
    }

    public async sendMail(dto: SendResetPasswordMailDto) {
        await this.commandBus.execute(new SendResetPasswordMailCommand(dto));
    }

    public async update(userId: Id, password: string, token: string) {
        return await this.commandBus.execute(new UpdatePasswordCommand(userId, password, token));
    }
}
