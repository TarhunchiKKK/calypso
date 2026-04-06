import z from "zod";
import type { Id } from "../shared/db.types";

export const UserZodSchema = z.object({
    id: z.string(),
    email: z.string().optional(),
    metadata: z.object({
        fullName: z.string().optional(),
        avatar: z.string().optional()
    })
});

// DELETE
export type UserInfo = {
    id: Id;

    email?: string;

    avatar?: string;
};

export type User = z.infer<typeof UserZodSchema>;
