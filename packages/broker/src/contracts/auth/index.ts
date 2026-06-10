import type { EmailVerificationBrokerMessage } from "./email-verification.message";

export const AuthBrokerContracts = {
    emailVerification: {
        pattern: "auth.email.verification",
        payload: (dto: EmailVerificationBrokerMessage) => dto
    }
};

export * from "./email-verification.message";
