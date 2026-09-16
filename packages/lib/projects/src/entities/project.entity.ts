import { IdZodSchema } from "@lib/common";
import { ProjectCreatorZodSchema } from "entry";
import z from "zod";

export const ProjectTypesZodSchema = z.enum(["board", "note"]);

export const ProjectZodSchema = z.object({
    id: IdZodSchema,
    type: ProjectTypesZodSchema,
    title: z.string(),
    description: z.string().optional(),
    icon: z.string(),
    creator: ProjectCreatorZodSchema,
    createdAt: z.date(),
    lastAccessedAt: z.date().optional()
});

export type Project = z.infer<typeof ProjectZodSchema>;
export type ProjectTypes = z.infer<typeof ProjectTypesZodSchema>;
