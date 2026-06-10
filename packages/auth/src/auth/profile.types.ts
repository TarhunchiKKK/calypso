import { IdZodSchema } from "@lib/common";
import z from "zod";

export const ProfileZodSchema = z.object({
    id: IdZodSchema,
    email: z.string(),
    username: z.string(),
    avatar: z.string().optional()
});

export type Profile = z.infer<typeof ProfileZodSchema>;
