import type { EmailVerificationBrokerMessage } from "./email-verification.message";
import type { ResetPasswordBrokerMessage } from "./password-recovery.message";

export const AuthBrokerContracts = {
    emailVerification: {
        pattern: "auth.email.verification",
        payload: (dto: EmailVerificationBrokerMessage) => dto
    },
    resetPassword: {
        pattern: "auth.password.reset",
        payload: (dto: ResetPasswordBrokerMessage) => dto
    }
};

export * from "./email-verification.message";
export * from "./password-recovery.message";
