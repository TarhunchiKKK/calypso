import { AuthBrokerContracts, type EmailVerificationBrokerMessage, type ResetPasswordBrokerMessage } from "@contracts/broker";
import { Controller, Inject } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    public constructor(@Inject(AuthService) private readonly authService: AuthService) {}

    @EventPattern(AuthBrokerContracts.emailVerification.pattern)
    public async sendEmailVerification(@Payload() payload: EmailVerificationBrokerMessage) {
        await this.authService.sendEmailVerification(payload);
    }

    @EventPattern(AuthBrokerContracts.resetPassword.pattern)
    public async sendResetPassword(@Payload() payload: ResetPasswordBrokerMessage) {
        await this.sendResetPassword(payload);
    }
}
