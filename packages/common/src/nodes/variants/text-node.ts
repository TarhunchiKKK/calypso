import type { NodeTypes } from "nodes/core/node-base";
import { RectNodeZodSchema } from "nodes/core/rect-node";
import z from "zod";

export const TextNodeZodSchema = z.intersection(
    RectNodeZodSchema,
    z.object({
        type: z.literal<NodeTypes>("text"),

        // FIXME: Replace this type with `Descendant` type from "slate"
        text: z.any()
    })
);

export type TextNode = z.infer<typeof TextNodeZodSchema>;
