import type { NodeTypes, NodeWrapper } from "@/board-editor/core";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import type { ShapeNode } from "../../variants/shape/shape-node.type";
import { ShapeNodeNodeWrapper } from "../../variants/shape/shape-node.wrapper";
import type { StickerNode } from "../../variants/sticker/sticker.type";
import { StickerNodeWrapper } from "../../variants/sticker/sticker.wrapper";
import type { TextNode } from "../../variants/text/text-node.type";
import { TextNodeWrapper } from "../../variants/text/text-node.wrapper";

export const WrapperConstructorsMap: Record<NodeTypes, ConstructorFunction<typeof NodeWrapper>> = {
    sticker: node => new StickerNodeWrapper(node as StickerNode),
    text: node => new TextNodeWrapper(node as TextNode),
    shape: node => new ShapeNodeNodeWrapper(node as ShapeNode)
};
