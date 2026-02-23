import type { RectNode } from "@/board-editor/core";

export type StickerNode = RectNode & {
    type: "sticker";

    text: string;
};
