import { NodeBase, Rect } from "@/features/board-editor/core";

export type StickerNode = NodeBase & {
    type: "sticker";

    rect: Rect;

    text: string;
};
