export const PASSWORD_RECOVERY_QUEUE = Symbol().toString();

export type PasswordRecoveryQueueJobs = "send-mail";

export type SendResetPasswordMailQueueData = {
    email: string;

    token: string;
};