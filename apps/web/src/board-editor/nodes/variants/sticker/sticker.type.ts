import type { RectNode } from "@/entities/nodes";

export type StickerNode = RectNode & {
    type: "sticker";

    text: string;
};
