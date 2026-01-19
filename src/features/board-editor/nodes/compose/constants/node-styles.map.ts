import type { NodeStyles, NodeTypes } from "@/features/board-editor/core";

export const NodeStylesMap: Record<NodeTypes, Set<keyof NodeStyles>> = {
    sticker: new Set(["backgroundColor", "borderColor", "borderStyle", "borderWidth", "color", "fontStyle"]),
    text: new Set(["color", "fontStyle", "fontSize", "textAlign"])
};
