import type { User } from "auth";

export type ProjectCreator = Pick<User, "id" | "email">;
