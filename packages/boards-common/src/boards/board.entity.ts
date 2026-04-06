import { ProjectZodSchema } from "@repo/common";
import type z from "zod";

export const BoardZodSchema = ProjectZodSchema.extend({});

export type Board = z.infer<typeof BoardZodSchema>;
