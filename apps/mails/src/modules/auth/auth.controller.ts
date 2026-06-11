import {
    AuthBrokerContracts,
    BrokerValidation,
    type EmailVerificationBrokerMessage,
    EmailVerificationBrokerMessageZodSchema,
    type ResetPasswordBrokerMessage,
    ResetPasswordBrokerMessageZodSchema
} from "@contracts/broker";
import { Controller, Inject } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    public constructor(@Inject(AuthService) private readonly authService: AuthService) {}

    @EventPattern(AuthBrokerContracts.emailVerification.pattern)
    public async sendEmailVerification(@BrokerValidation(EmailVerificationBrokerMessageZodSchema) payload: EmailVerificationBrokerMessage) {
        await this.authService.sendEmailVerification(payload);
    }

    @EventPattern(AuthBrokerContracts.resetPassword.pattern)
    public async sendResetPassword(@BrokerValidation(ResetPasswordBrokerMessageZodSchema) payload: ResetPasswordBrokerMessage) {
        await this.sendResetPassword(payload);
    }
}
