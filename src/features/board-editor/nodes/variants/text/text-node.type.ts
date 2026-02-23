import type { RectNode } from "@/features/board-editor/core";
import type { Descendant } from "slate";

export type TextNode = RectNode & {
    type: "text";

    text: Descendant[];
};
