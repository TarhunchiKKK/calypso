import type { RelativePoint } from "@repo/common";
import type { NodeBase, RectNode } from "./core.types";
import type { NodeStyles } from "./styles.types";

export type StickerNode = RectNode & {
    type: "sticker";

    text: string;

    styles: Pick<
        NodeStyles,
        | "backgroundColor"
        | "borderStyle"
        | "borderColor"
        | "borderRadius"
        | "fontFamily"
        | "fontSize"
        | "textColor"
        | "textAlign"
    >;
};

export type ArrowNode = NodeBase & {
    type: "arrow";

    start: RelativePoint;

    end: RelativePoint;

    text?: string;

    styles: Pick<NodeStyles, "angleType" | "lineColor" | "lineType" | "lineWidth">;
};

export type TextNode = RectNode & {
    type: "text";

    text: string;
};

export type ShapeVariants = "rectangle" | "circle" | "triangle" | "diamond" | "star" | "hexagon";

export type ShapeNode = RectNode & {
    type: "shape";

    variant: ShapeVariants;

    styles: Pick<NodeStyles, "backgroundColor" | "borderColor">;
};
