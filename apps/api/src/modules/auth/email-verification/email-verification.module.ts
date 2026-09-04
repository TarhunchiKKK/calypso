import { Module } from "@nestjs/common";
import { EmailVerificationController } from "./email-verification.controller";
import { EmailVerificationProcessor } from "./email-verification.processor";
import { EmailVerificationService } from "./email-verification.service";
import { SendEmailVerificationCommandHandler } from "./handlers/send-email-verification.handler";
import { SendEmailVerificationMailCommandHandler } from "./handlers/send-email-verification-mail.handler";
import { VerifyEmailCommandHandler } from "./handlers/verify-email.handler";

@Module({
    controllers: [EmailVerificationController],
    providers: [EmailVerificationService, EmailVerificationProcessor, SendEmailVerificationCommandHandler, SendEmailVerificationMailCommandHandler, VerifyEmailCommandHandler]
})
export class EmailVerificationModule {}
