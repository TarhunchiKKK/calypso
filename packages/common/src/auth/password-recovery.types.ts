export type ResetPassword = {
    email: string;

    redirectTo?: string;
};

export type ChangePasswordDto = {
    userId: string;

    newPassword: string;
};
