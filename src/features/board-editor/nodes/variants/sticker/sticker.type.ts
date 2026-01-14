import type { RectNode } from "@/features/board-editor/core";

export type StickerNode = RectNode & {
    type: "sticker";

    text: string;
};
