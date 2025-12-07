import { NodeBase } from "../types";

export type StickerNode = NodeBase & {
    type: "sticker";

    x: number;

    y: number;

    width: number;

    height: number;

    text: string;
};
