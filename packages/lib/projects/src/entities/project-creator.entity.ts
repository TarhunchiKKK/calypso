import { ProfileZodSchema } from "@lib/auth";
import type z from "zod";

export const ProjectCreatorZodSchema = ProfileZodSchema.pick({
    id: true,
    username: true,
    email: true,
    avatar: true
});

export type ProjectCreator = z.infer<typeof ProjectCreatorZodSchema>;
