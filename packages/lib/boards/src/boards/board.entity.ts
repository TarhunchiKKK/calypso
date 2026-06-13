import { ProjectZodSchema } from "@lib/projects";
import type z from "zod";

export const BoardZodSchema = ProjectZodSchema.extend({});

export type Board = z.infer<typeof ProjectZodSchema>;
