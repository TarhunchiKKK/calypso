import { ProjectZodSchema } from "@repo/projects";
import type z from "zod";

export const BoardZodSchema = ProjectZodSchema.extend({});

export type Board = z.infer<typeof ProjectZodSchema>;
