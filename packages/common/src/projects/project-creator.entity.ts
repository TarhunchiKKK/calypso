import type z from "zod";
import { UserZodSchema } from "../auth";

export const ProjectCreatorZodSchema = UserZodSchema.pick({
    id: true,
    email: true
});

export type ProjectCreator = z.infer<typeof ProjectCreatorZodSchema>;
