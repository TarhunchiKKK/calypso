import type { NodeTypes } from "nodes/core/node-base";
import { CreateNodeStylesDtoZodSchema, NodeStylesZodSchema, ReplaceNodeStylesDtoZodSchema } from "nodes/core/node-styles";
import { RectNodeZodSchema } from "nodes/core/rect-node";
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

export const CreateTextNodeDtoZodSchema = z.intersection(
    TextNodeZodSchema,
    z.object({
        styles: CreateNodeStylesDtoZodSchema.pick({ color: true, fontStyle: true, fontSize: true, textAlign: true })
    })
);

export type CreateTextNodeDto = z.infer<typeof CreateTextNodeDtoZodSchema>;

export const ReplaceTextNodeDtoSchema = z.intersection(
    TextNodeZodSchema,
    z.object({
        styles: ReplaceNodeStylesDtoZodSchema.pick({ color: true, fontStyle: true, fontSize: true, textAlign: true })
    })
);

export type ReplaceTextNodeDto = z.infer<typeof ReplaceTextNodeDtoSchema>;
