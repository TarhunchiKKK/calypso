import type { Descendant } from "slate";
import type { RectNode } from "@/board-editor/core";

export type TextNode = RectNode & {
    type: "text";

    text: Descendant[];
};
