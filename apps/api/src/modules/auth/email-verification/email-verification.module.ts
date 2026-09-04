import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { EmailVerificationController } from "./email-verification.controller";
import { EmailVerificationProcessor } from "./email-verification.processor";
import { EmailVerificationService } from "./email-verification.service";
import { SendEmailVerificationCommandHandler } from "./handlers/send-email-verification.handler";
import { SendEmailVerificationMailCommandHandler } from "./handlers/send-email-verification-mail.handler";
import { VerifyEmailCommandHandler } from "./handlers/verify-email.handler";
import { EMAIL_VERIFICATION_QUEUE } from "./lib/bullmq.lib";

@Module({
    imports: [
        BullModule.registerQueue({
            name: EMAIL_VERIFICATION_QUEUE
        })
    ],
    controllers: [EmailVerificationController],
    providers: [EmailVerificationService, EmailVerificationProcessor, SendEmailVerificationCommandHandler, SendEmailVerificationMailCommandHandler, VerifyEmailCommandHandler]
})
export class EmailVerificationModule {}
