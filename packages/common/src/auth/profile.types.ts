import z from "zod";
import { IdZodSchema } from "../shared/db.types";

export const ProfileZodSchema = z.object({
    id: IdZodSchema,
    email: z.string(),
    username: z.string(),
    avatar: z.string().optional()
});

export type Profile = z.infer<typeof ProfileZodSchema>;
