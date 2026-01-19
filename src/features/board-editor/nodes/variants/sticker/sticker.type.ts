import type { NodeStyles, RectNode } from "@/features/board-editor/core";

type Styles = Required<Pick<NodeStyles, "backgroundColor" | "borderColor" | "borderStyle" | "borderWidth" | "color" | "fontStyle">>;

export type StickerNode = RectNode & {
    type: "sticker";

    text: string;

    styles: Styles;
};
