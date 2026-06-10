import { Module } from "@nestjs/common";
import { ResetPasswordCommandHandler } from "./handlers/reset-password.handler";
import { UpdatePasswordCommandHandler } from "./handlers/update-password.handler";
import { PasswordRecoveryController } from "./password-recovery.controller";
import { PasswordRecoveryService } from "./password-recovery.service";

@Module({
    controllers: [PasswordRecoveryController],
    providers: [PasswordRecoveryService, ResetPasswordCommandHandler, UpdatePasswordCommandHandler]
})
export class PasswordRecoveryModule {}
