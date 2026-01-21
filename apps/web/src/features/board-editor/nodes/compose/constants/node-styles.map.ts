import type { NodeTypes } from "@/features/board-editor/core";
import type { NodeStyles } from "@/features/board-editor/modules/styling";

export const NodeStylesMap: Record<NodeTypes, Set<keyof NodeStyles>> = {
    sticker: new Set(["backgroundColor", "borderColor", "borderStyle", "color", "fontStyle"]),
    text: new Set(["color", "fontStyle", "fontSize", "textAlign"])
};
