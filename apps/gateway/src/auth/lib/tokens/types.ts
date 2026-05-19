import type { Profile } from "@repo/auth";

export type TokenPayload = Pick<Profile, "id" | "username" | "email" | "avatar">;
