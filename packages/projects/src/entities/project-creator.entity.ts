import { type Profile, ProfileZodSchema } from "@lib/auth";
import type z from "zod";
import type { Project } from "./project.entity";

export const ProjectCreatorZodSchema = ProfileZodSchema.extend({});

export type ProjectCreator = z.infer<typeof ProjectCreatorZodSchema>;

export type ProjectWithCreator<T extends Project = Project> = T & {
    creator: Profile;
};
