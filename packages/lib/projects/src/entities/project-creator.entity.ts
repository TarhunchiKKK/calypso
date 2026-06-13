import { ProfileZodSchema } from "@lib/auth";
import type z from "zod";
import type { Project } from "./project.entity";

export const ProjectCreatorZodSchema = ProfileZodSchema.pick({
    id: true,
    username: true,
    email: true,
    avatar: true
});

export type ProjectCreator = z.infer<typeof ProjectCreatorZodSchema>;

export type ProjectWithCreator<T extends Project = Project> = T & {
    creator: ProjectCreator;
};
