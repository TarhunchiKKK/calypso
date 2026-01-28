import z from "zod";
import { type NodeTypes, RectNodeZodSchema } from "../core";
import { NodeStylesZodSchema } from "../node-styles";

export const StickerNodeZodSchema = z.intersection(
    RectNodeZodSchema,
    z.object({
        type: z.literal<NodeTypes>("sticker"),
        styles: NodeStylesZodSchema.pick({ color: true, fontStyle: true, fontSize: true, textAlign: true }),
        text: z.string()
    })
);

export type StickerNode = z.infer<typeof StickerNodeZodSchema>;
