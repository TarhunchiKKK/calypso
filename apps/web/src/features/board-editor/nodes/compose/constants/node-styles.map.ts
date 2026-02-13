import type { NodeStyles, NodeTypes } from "@repo/common";

export const NodeStylesMap: Record<NodeTypes, Set<keyof NodeStyles>> = {
    sticker: new Set(["backgroundColor", "borderColor", "borderStyle", "color", "fontStyle"]),
    text: new Set(["color", "fontStyle", "fontSize", "textAlign"])
};
