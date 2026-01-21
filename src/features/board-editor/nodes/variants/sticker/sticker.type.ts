import type { RectNode } from "@/features/board-editor/core";
import type { NodeStyles } from "@/features/board-editor/modules/styling";

type Styles = Pick<NodeStyles, "backgroundColor" | "borderColor" | "borderStyle" | "color" | "fontStyle">;

export type StickerNode = RectNode & {
    type: "sticker";

    styles: Styles;

    text: string;
};
