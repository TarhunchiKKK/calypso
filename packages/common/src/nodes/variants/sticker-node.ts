import z from "zod";
import type { NodeTypes } from "../core/node-base";
import { RectNodeZodSchema } from "../core/rect-node";

export const StickerNodeZodSchema = z.intersection(
    RectNodeZodSchema,
    z.object({
        type: z.literal<NodeTypes>("sticker"),
        text: z.string()
    })
);

export type StickerNode = z.infer<typeof StickerNodeZodSchema>;
