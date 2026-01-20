import type { Descendant } from "slate";
import type { RectNode } from "@/features/board-editor/core";
import type { NodeStyles } from "@/features/board-editor/modules/styling";

type Styles = Required<Pick<NodeStyles, "color" | "fontStyle" | "fontSize" | "textAlign">>;

export type TextNode = RectNode & {
    type: "text";

    text: Descendant[];

    styles: Styles;
};
