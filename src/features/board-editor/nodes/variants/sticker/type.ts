import { NodeBase } from "../../types";

export type StickerNode = NodeBase & {
    x: number;

    y: number;

    width: number;

    height: number;

    text: string;
};
