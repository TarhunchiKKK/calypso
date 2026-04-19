import type { Profile } from "@repo/common";

export type TokenPayload = Pick<Profile, "id" | "username" | "email" | "avatar">;
