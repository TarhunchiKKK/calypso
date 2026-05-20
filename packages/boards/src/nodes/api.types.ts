import { IdZodSchema } from "@repo/common";
import z from "zod";
import { AnyNodeZodSchema } from "./compose.types";

export const CreateManyNodesDtoZodSchema = z.object({
    nodes: z.array(AnyNodeZodSchema),
    boardId: IdZodSchema
});

export const UpdateManyNodesDtoZodSchema = z.object({
    nodes: z.array(AnyNodeZodSchema),
    boardId: IdZodSchema
});

export const RemoveManyNodesDtoZodSchema = z.object({
    ids: z.array(IdZodSchema),
    boardId: IdZodSchema
});

export type CreateManyNodesDto = z.infer<typeof CreateManyNodesDtoZodSchema>;
export type UpdateManyNodesDto = z.infer<typeof UpdateManyNodesDtoZodSchema>;
export type RemoveManyNodesDto = z.infer<typeof RemoveManyNodesDtoZodSchema>;
