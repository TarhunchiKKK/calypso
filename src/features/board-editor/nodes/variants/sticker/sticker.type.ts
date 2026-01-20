import type { RectNode } from "@/features/board-editor/core";
import type { NodeStyles } from "@/features/board-editor/modules/styling";

type Styles = Required<Pick<NodeStyles, "backgroundColor" | "borderColor" | "borderStyle" | "borderWidth" | "color" | "fontStyle">>;

export type StickerNode = RectNode & {
    type: "sticker";

    text: string;

    styles: Styles;
};
