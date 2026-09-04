export const EMAIL_VERIFICATION_QUEUE = Symbol().toString();

export type EmailVerificationQueueJobs = "send-mail";

export type SendEmailVerificationMailQueueData = {
    email: string;

    token: string;
};
