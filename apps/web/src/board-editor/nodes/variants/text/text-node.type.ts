import type { Descendant } from "slate";
import type { RectNode } from "@/entities/nodes";

export type TextNode = RectNode & {
    type: "text";

    text: Descendant[];
};
