import type { ArrowNode, ShapeNode, StickerNode, TextNode } from "./variants.types";

export type AnyNode = StickerNode | ArrowNode | TextNode | ShapeNode;

export type NodeTypesMap = {
    sticker: StickerNode;
    arrow: ArrowNode;
    text: TextNode;
    shape: ShapeNode;
};
