import { IdZodSchema } from "@repo/common";
import z from "zod";

export const ProjectZodSchema = z.object({
    id: IdZodSchema,
    title: z.string(),
    description: z.string().optional(),
    icon: z.string(),
    creatorId: IdZodSchema,
    createdAt: z.date(),
    updatedAt: z.date().optional()
});

export const ProjectTypesZodSchema = z.enum(["board", "note"]);

export const ProjectWithTypeZodSchema = ProjectZodSchema.extend({
    type: ProjectTypesZodSchema
});

export type Project = z.infer<typeof ProjectZodSchema>;
export type ProjectTypes = z.infer<typeof ProjectTypesZodSchema>;
export type ProjectWithType = z.infer<typeof ProjectWithTypeZodSchema>;
