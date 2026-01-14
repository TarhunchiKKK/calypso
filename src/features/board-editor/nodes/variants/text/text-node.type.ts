import type { Descendant } from "slate";
import type { RectNode } from "@/features/board-editor/core";

export type TextNode = RectNode & {
    type: "text";

    text: Descendant[];
};
