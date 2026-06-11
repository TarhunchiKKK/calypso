import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SendEmailVerificationCommandHandler } from "./handlers/send-email-verification.handler";
import { SendResetPasswordCommandHandler } from "./handlers/send-reset-password.handler";

@Module({
    controllers: [AuthController],
    providers: [AuthService, SendEmailVerificationCommandHandler, SendResetPasswordCommandHandler]
})
export class AuthModule {}
