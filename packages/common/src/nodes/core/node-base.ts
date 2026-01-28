import z from "zod";

export const NodeTypesZodSchema = z.union([z.literal("sticker"), z.literal("text")], { error: "Unknown node type" });

export type NodeBase = z.infer<typeof NodeBaseZodSchema>;

export const NodeBaseZodSchema = z.object({
    id: z.uuid({ error: "Node id  should be valid uuid" }),
    type: NodeTypesZodSchema,
    boardId: z.uuid({ error: "Board id should have correct uuid format" }),
    blocked: z.boolean({ error: "Node blocking status should be valid boolean" })
});

export type NodeTypes = z.infer<typeof NodeTypesZodSchema>;

export const CreateNodeBaseDtoZodSchema = NodeBaseZodSchema;

export type CreateNodeBaseDto = z.infer<typeof CreateNodeBaseDtoZodSchema>;

export const ReplaceNodeBaseDtoZodSchema = NodeBaseZodSchema;

export type ReplaceNodeBaseDto = z.infer<typeof ReplaceNodeBaseDtoZodSchema>;

export type RemoveOneNodeDto = {
    id: string;

    boardId: string;
};

export type RemoveManyNodesDto = {
    ids: string[];

    boardId: string;
};
