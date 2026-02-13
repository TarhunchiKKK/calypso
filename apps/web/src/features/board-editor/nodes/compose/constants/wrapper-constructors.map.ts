import type { NodeTypes, StickerNode, TextNode } from "@repo/common";
import type { NodeWrapper } from "@/features/board-editor/core";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { StickerNodeWrapper } from "../../variants/sticker/sticker.wrapper";
import { TextNodeWrapper } from "../../variants/text/text-node.wrapper";

export const WrapperConstructorsMap: Record<NodeTypes, ConstructorFunction<typeof NodeWrapper>> = {
    sticker: node => new StickerNodeWrapper(node as StickerNode),
    text: node => new TextNodeWrapper(node as TextNode)
};
