import { useSendEmailVerification } from "./send-email-verification.api";
import { useVerifyEmail } from "./verify-email.api";

export const EmailVerificationApi = {
    useSend: useSendEmailVerification,
    useVerify: useVerifyEmail
};
