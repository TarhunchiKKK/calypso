import z from "zod";
import { IdZodSchema } from "../shared/db.types";

export const UserZodSchema = z.object({
    id: IdZodSchema,
    email: z.string().optional(),
    metadata: z.object({
        fullName: z.string().optional(),
        avatar: z.string().optional()
    })
});

export type User = z.infer<typeof UserZodSchema>;
