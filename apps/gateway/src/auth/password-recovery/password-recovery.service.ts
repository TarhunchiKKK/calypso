import { Inject, Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import type { ChangePasswordDto } from "./dto/change-password.dto";
import { ChangePasswordCommand } from "./handlers/change-password.handler";
import { ResetPasswordCommand } from "./handlers/reset-password.handler";

@Injectable()
export class PasswordRecoveryService {
    public constructor(@Inject(CommandBus) private readonly commandBus: CommandBus) {}

    public async reset(email: string) {
        await this.commandBus.execute(new ResetPasswordCommand(email));
    }

    public async change(dto: ChangePasswordDto & { userId: string }) {
        await this.commandBus.execute(new ChangePasswordCommand(dto));
    }
}
