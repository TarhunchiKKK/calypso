import type z from "zod";
import { ProfileZodSchema } from "../auth";

export const ProjectCreatorZodSchema = ProfileZodSchema.pick({
    id: true,
    email: true
});

export type ProjectCreator = z.infer<typeof ProjectCreatorZodSchema>;
