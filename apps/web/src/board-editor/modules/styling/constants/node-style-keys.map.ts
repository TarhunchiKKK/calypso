import type { NodeStyles, NodeTypes } from "@lib/boards";

export const NodeStyleKeysMap: Record<NodeTypes, (keyof NodeStyles)[][]> = {
    sticker: [["fontFamily"], ["backgroundColor", "textColor"], ["borderStyle", "borderColor", "borderRadius"], ["textAlign"]],
    arrow: [["lineWidth", "lineColor", "lineType"], ["angleType"]],
    text: [["fontFamily", "fontSize"], ["textColor"], ["textAlign"]],
    shape: [["backgroundColor", "borderColor"]],
    media: [],
    note: [["backgroundColor", "textColor"], ["borderColor"]],
    drawing: [["lineColor", "lineWidth"]]
};
