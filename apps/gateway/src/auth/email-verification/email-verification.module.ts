import { Module } from "@nestjs/common";
import { EmailVerificationController } from "./email-verification.controller";
import { EmailVerificationService } from "./email-verification.service";
import { SendEmailVerificationCommandHandler } from "./handlers/send-email-verification.handler";
import { VerifyEmailCommandHandler } from "./handlers/verify-email.handler";

@Module({
    controllers: [EmailVerificationController],
    providers: [EmailVerificationService, SendEmailVerificationCommandHandler, VerifyEmailCommandHandler]
})
export class EmailVerificationModule {}
