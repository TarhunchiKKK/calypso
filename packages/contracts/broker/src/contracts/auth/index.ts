import { withMessageId } from "../../deduplication";
import type { EmailVerificationBrokerMessage } from "./email-verification.message";
import type { ResetPasswordBrokerMessage } from "./password-recovery.message";

export const AuthBrokerContracts = {
    emailVerification: {
        pattern: "auth.email.verification",
        get: (dto: EmailVerificationBrokerMessage) => [AuthBrokerContracts.emailVerification.pattern, withMessageId(dto)] as const
    },
    resetPassword: {
        pattern: "auth.password.reset",
        get: (dto: ResetPasswordBrokerMessage) => [AuthBrokerContracts.resetPassword.pattern, withMessageId(dto)] as const
    }
};

export * from "./email-verification.message";
export * from "./password-recovery.message";
