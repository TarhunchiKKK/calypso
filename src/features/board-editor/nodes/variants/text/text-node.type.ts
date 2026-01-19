import type { Descendant } from "slate";
import type { NodeStyles, RectNode } from "@/features/board-editor/core";

type Styles = Required<Pick<NodeStyles, "color" | "fontStyle" | "fontSize" | "textAlign">>;

export type TextNode = RectNode & {
    type: "text";

    text: Descendant[];

    styles: Styles;
};
