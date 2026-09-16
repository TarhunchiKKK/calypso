import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { ResetPasswordCommandHandler } from "./handlers/reset-password.handler";
import { SendResetPasswordMailCommandHandler } from "./handlers/send-reset-password-mail.handler";
import { UpdatePasswordCommandHandler } from "./handlers/update-password.handler";
import { PASSWORD_RECOVERY_QUEUE } from "./lib/bullmq.lib";
import { PasswordRecoveryController } from "./password-recovery.controller";
import { PasswordRecoveryProcessor } from "./password-recovery.processor";
import { PasswordRecoveryService } from "./password-recovery.service";

@Module({
    imports: [
        BullModule.registerQueue({
            name: PASSWORD_RECOVERY_QUEUE
        })
    ],
    controllers: [PasswordRecoveryController],
    providers: [PasswordRecoveryService, PasswordRecoveryProcessor, ResetPasswordCommandHandler, SendResetPasswordMailCommandHandler, UpdatePasswordCommandHandler]
})
export class PasswordRecoveryModule {}
