import { IdZodSchema } from "@lib/common";
import z from "zod";

export const UserZodSchema = z.object({
    id: IdZodSchema,
    username: z.string({ message: "Username should be string" }),
    email: z.string({ message: "Email should be string" }).email({ message: "Incorrect email format" }),
    password: z
        .string({ message: "Password should be string" })
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(25, { message: "Password must be at most 25 characters long" }),
    avatar: z.string().optional(),
    emailVerified: z.boolean()
});

export type User = z.infer<typeof UserZodSchema>;

export const ProfileZodSchema = UserZodSchema.pick({
    id: true,
    email: true,
    username: true,
    avatar: true,
    emailVerified: true
});

export type Profile = z.infer<typeof ProfileZodSchema>;
