import z from "zod";
import type { NodeTypes } from "../core/node-base";
import { CreateNodeStylesDtoZodSchema, NodeStylesZodSchema, ReplaceNodeStylesDtoZodSchema } from "../core/node-styles";
import { CreateRectNodeDtoZodSchema, RectNodeZodSchema } from "../core/rect-node";

export const StickerNodeZodSchema = z.intersection(
    RectNodeZodSchema,
    z.object({
        type: z.literal<NodeTypes>("sticker"),
        styles: NodeStylesZodSchema.pick({ color: true, fontStyle: true, fontSize: true, textAlign: true }),
        text: z.string()
    })
);

export type StickerNode = z.infer<typeof StickerNodeZodSchema>;

export const CreateStickerNodeZodSchema = z.intersection(
    CreateRectNodeDtoZodSchema,
    z.object({
        type: z.literal<NodeTypes>("sticker"),
        styles: CreateNodeStylesDtoZodSchema.pick({ color: true, fontStyle: true, fontSize: true, textAlign: true }),
        text: z.string()
    })
);

export type CreateStickerNodeDto = z.infer<typeof CreateStickerNodeZodSchema>;

export const ReplaceStickerNodeDtoZodSchema = z.intersection(
    CreateStickerNodeZodSchema,
    z.object({
        styles: ReplaceNodeStylesDtoZodSchema.pick({ color: true, fontStyle: true, fontSize: true, textAlign: true })
    })
);
