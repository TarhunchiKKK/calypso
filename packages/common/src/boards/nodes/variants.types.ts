import { RectNode } from "./core.types";

export type StickerNode = RectNode & {
    type: "sticker";

    text: string;
};

export type TextNode = RectNode & {
    type: "text";

    text: string;
};

export type ShapeVariants = "rectangle" | "circle" | "triangle" | "diamond" | "star" | "hexagon";

export type ShapeNode = RectNode & {
    type: "shape";

    variant: ShapeVariants;
};