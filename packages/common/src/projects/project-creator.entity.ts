import type z from "zod";
import { type Profile, ProfileZodSchema } from "../auth";
import type { OmitFields } from "../shared/utility.types";
import type { Project } from "./project.entity";

export const ProjectCreatorZodSchema = ProfileZodSchema.extend({});

export type ProjectCreator = z.infer<typeof ProjectCreatorZodSchema>;

export type ProjectWithCreator<T extends Project = Project> = OmitFields<T, "creatorId"> & {
    creator: Profile;
};
