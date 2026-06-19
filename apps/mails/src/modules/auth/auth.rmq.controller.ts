import { Logging } from "@api/logs";
import {
    AuthBrokerContracts,
    BrokerController,
    BrokerValidation,
    DeduplicateMessages,
    DeduplicationTtl,
    type EmailVerificationBrokerMessage,
    EmailVerificationBrokerMessageZodSchema,
    type ResetPasswordBrokerMessage,
    ResetPasswordBrokerMessageZodSchema
} from "@contracts/broker";
import { Inject } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { AuthService } from "./auth.service";
import { EMAIL_VERIFICATION_DEDUPLICATION_TTL, RESET_PASSWORD_DEDUPLICATION_TTL } from "./lib/broker.constants";

@BrokerController()
@DeduplicateMessages()
@Logging("broker")
export class AuthRmqController {
    public constructor(@Inject(AuthService) private readonly authService: AuthService) {}

    @EventPattern(AuthBrokerContracts.emailVerification.pattern)
    @DeduplicationTtl(EMAIL_VERIFICATION_DEDUPLICATION_TTL)
    public async sendEmailVerification(@BrokerValidation(EmailVerificationBrokerMessageZodSchema) payload: EmailVerificationBrokerMessage) {
        await this.authService.sendEmailVerification(payload);
    }

    @EventPattern(AuthBrokerContracts.resetPassword.pattern)
    @DeduplicationTtl(RESET_PASSWORD_DEDUPLICATION_TTL)
    public async sendResetPassword(@BrokerValidation(ResetPasswordBrokerMessageZodSchema) payload: ResetPasswordBrokerMessage) {
        await this.sendResetPassword(payload);
    }
}
