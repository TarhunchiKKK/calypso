import { NodeBase } from "@/features/board-editor/core";

export type StickerNode = NodeBase & {
    type: "sticker";

    x: number;

    y: number;

    width: number;

    height: number;

    text: string;
};
