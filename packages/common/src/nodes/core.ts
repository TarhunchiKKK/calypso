import { RectZodSchema } from "shared/geometry";
import z from "zod";

export const NodeTypesZodSchema = z.union([z.literal("sticker"), z.literal("text")], { error: "Unknown node type" });

export const NodeBaseZodSchema = z.object({
    id: z.uuid({ error: "Node id  should be valid uuid" }),
    type: NodeTypesZodSchema,
    blocked: z.boolean({ error: "Node blocking status should be valid boolean" })
});

export const RectNodeZodSchema = z.intersection(
    NodeBaseZodSchema,
    z.object({
        rect: RectZodSchema
    })
);

export type NodeTypes = z.infer<typeof NodeTypesZodSchema>;

export type NodeBase = z.infer<typeof NodeBaseZodSchema>;

export type RectNode = z.infer<typeof RectNodeZodSchema>;
