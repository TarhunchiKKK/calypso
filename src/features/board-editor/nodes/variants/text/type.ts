import type { Descendant } from "slate";
import type { NodeBase, Rect } from "@/features/board-editor/core";

export type TextNode = NodeBase & {
    rect: Rect;

    text: Descendant[];
};
