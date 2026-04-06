import { UserZodSchema } from "auth";
import type z from "zod";

export const ProjectCreatorZodSchema = UserZodSchema.pick({
    id: true,
    email: true
});

export type ProjectCreator = z.infer<typeof ProjectCreatorZodSchema>;
