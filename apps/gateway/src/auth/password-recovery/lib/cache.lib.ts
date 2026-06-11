import type { Id } from "@lib/common";

export const PasswordRecoveryCacheKeys = {
    byUser: (userId: Id) => `user:password-recovery:${userId}`
};

export const PasswordRecoveryCacheTtls = {
    byUser: 900
};
