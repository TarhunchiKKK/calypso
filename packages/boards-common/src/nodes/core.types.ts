import { IdZodSchema, RectZodSchema } from "@repo/common";
import z from "zod";

export const NodeTypesZodSchema = z.enum(["sticker", "text", "shape", "arrow"]);

export const NodeBaseZodSchema = z.object({
    id: IdZodSchema,
    type: NodeTypesZodSchema,
    locked: z.boolean(),
    styles: z.record(z.string(), z.unknown())
});

export const RectNodeZodSchema = NodeBaseZodSchema.extend({
    rect: RectZodSchema
});

export type NodeTypes = z.infer<typeof NodeTypesZodSchema>;
export type NodeBase = z.infer<typeof NodeBaseZodSchema>;
export type RectNode = z.infer<typeof RectNodeZodSchema>;
