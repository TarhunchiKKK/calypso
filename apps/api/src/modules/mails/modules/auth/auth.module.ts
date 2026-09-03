import { Module } from "@nestjs/common";
import { AuthRmqController } from "./auth.rmq.controller";
import { AuthService } from "./auth.service";
import { SendEmailVerificationCommandHandler } from "./handlers/send-email-verification.handler";
import { SendResetPasswordCommandHandler } from "./handlers/send-reset-password.handler";

@Module({
    controllers: [AuthRmqController],
    providers: [AuthService, SendEmailVerificationCommandHandler, SendResetPasswordCommandHandler]
})
export class AuthModule {}
