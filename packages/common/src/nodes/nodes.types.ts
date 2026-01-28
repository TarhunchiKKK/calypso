import type { NodeStyles, RectNode } from "./core.types";

// FIXME: Replace this type with `Descendant` type from "slate"
type Descendant = string;

export type StickerNode = RectNode & {
    type: "sticker";

    styles: Pick<NodeStyles, "backgroundColor" | "borderColor" | "borderStyle" | "color" | "fontStyle">;

    text: string;
};

export type TextNode = RectNode & {
    type: "text";

    styles: Pick<NodeStyles, "color" | "fontStyle" | "fontSize" | "textAlign">;

    text: Descendant[];
};
