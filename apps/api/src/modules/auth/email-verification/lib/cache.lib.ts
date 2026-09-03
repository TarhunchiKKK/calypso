import type { Id } from "@lib/common";

export const EmailVerificationCacheKeys = {
    byUser: (userId: Id) => `user:email-verification:${userId}`
};

export const EmailVerificationCacheTtls = {
    byUser: 900
};
