import type { NodeTypes, NodeWrapper } from "@/features/board-editor/core";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { StickerNodeWrapper } from "../../variants/sticker/sticker.wrapper";
import { TextNodeWrapper } from "../../variants/text/text-node.wrapper";
import type { StickerNode } from "../../variants/sticker/sticker.type";
import type { TextNode } from "../../variants/text/text-node.type";

export const WrapperConstructorsMap: Record<NodeTypes, ConstructorFunction<typeof NodeWrapper>> = {
    sticker: node => new StickerNodeWrapper(node as StickerNode),
    text: node => new TextNodeWrapper(node as TextNode)
};
