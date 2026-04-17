import type z from "zod";
import { ProfileZodSchema } from "../auth";

export const ProjectCreatorZodSchema = ProfileZodSchema.extend({});

export type ProjectCreator = z.infer<typeof ProjectCreatorZodSchema>;
