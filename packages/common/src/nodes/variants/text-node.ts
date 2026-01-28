import { type NodeTypes, RectNodeZodSchema } from "nodes/core";
import { NodeStylesZodSchema } from "nodes/node-styles";
import z from "zod";

export const TextNodeZodSchema = z.intersection(
    RectNodeZodSchema,
    z.object({
        type: z.literal<NodeTypes>("text"),
        styles: NodeStylesZodSchema.pick({ color: true, fontStyle: true, fontSize: true, textAlign: true }),

        // FIXME: Replace this type with `Descendant` type from "slate"
        text: z.string()
    })
);

export type TextNode = z.infer<typeof TextNodeZodSchema>;
