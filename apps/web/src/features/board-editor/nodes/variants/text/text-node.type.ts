import type { Descendant } from "slate";
import type { RectNode } from "@/features/board-editor/core";
import type { NodeStyles } from "@/features/board-editor/modules/styling";

type Styles = Pick<NodeStyles, "color" | "fontStyle" | "fontSize" | "textAlign">;

export type TextNode = RectNode & {
    type: "text";

    styles: Styles;

    text: Descendant[];
};
