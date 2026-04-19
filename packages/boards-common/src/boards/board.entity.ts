import { ProjectZodSchema } from "@repo/common";
import type z from "zod";

export const BoardZodSchema = ProjectZodSchema.extend({});

export type Board = z.infer<typeof ProjectZodSchema>;

// export type Board = {
//     id: Id;

//     title: string;

//     description?: string;

//     thumbnail: string;

//     creatorId: Id;

//     createdAt: Date;

//     updatedAt?: Date;
// };
