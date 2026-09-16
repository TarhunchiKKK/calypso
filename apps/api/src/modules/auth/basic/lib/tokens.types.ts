import type { Profile } from "@lib/auth";

export type TokenPayload = Pick<Profile, "id" | "username" | "email" | "avatar">;
