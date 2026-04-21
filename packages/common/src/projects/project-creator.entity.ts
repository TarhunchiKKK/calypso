import type { OmitFields, Project } from "entry";
import type z from "zod";
import { type Profile, ProfileZodSchema } from "../auth";

export const ProjectCreatorZodSchema = ProfileZodSchema.extend({});

export type ProjectCreator = z.infer<typeof ProjectCreatorZodSchema>;

export type ProjectWithCreator<T extends Project> = OmitFields<T, "creatorId"> & {
    creator: Profile;
};
