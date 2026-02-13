import { NodeStylesZodSchema } from "entry";
import z from "zod";

export const NodeTypesZodSchema = z.union([z.literal("sticker"), z.literal("text")], { error: "Unknown node type" });

export type NodeBase = z.infer<typeof NodeBaseZodSchema>;

export const NodeBaseZodSchema = z.object({
    id: z.uuid({ error: "Node id  should be valid uuid" }),
    type: NodeTypesZodSchema,
    boardId: z.uuid({ error: "Board id should have correct uuid format" }),
    blocked: z.boolean({ error: "Node blocking status should be valid boolean" }),
    styles: NodeStylesZodSchema
});

export type NodeTypes = z.infer<typeof NodeTypesZodSchema>;

export const RemoveManyNodesDtoZodSchema = z.object({
    ids: z.array(z.uuid(), { error: "Node id should have correct uuid format" }),
    boardId: z.uuid({ error: "Board id should have correct uuid format" })
});

export type RemoveManyNodesDto = z.infer<typeof RemoveManyNodesDtoZodSchema>;
