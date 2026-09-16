import type { Session } from "@lib/auth";

export const MockSession: Session = {
    accessToken: crypto.randomUUID(),
    refreshToken: crypto.randomUUID(),
    expiresAt: 1_000
};
