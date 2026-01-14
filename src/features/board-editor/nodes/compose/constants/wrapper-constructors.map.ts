import type { NodeTypes, NodeWrapper } from "@/features/board-editor/core";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import type { StickerNode } from "../../variants/sticker/type";
import { StickerNodeWrapper } from "../../variants/sticker/wrapper";
import type { TextNode } from "../../variants/text/type";
import { TextNodeWrapper } from "../../variants/text/wrapper";

export const WrapperConstructorsMap: Record<NodeTypes, ConstructorFunction<typeof NodeWrapper>> = {
    sticker: node => new StickerNodeWrapper(node as StickerNode),
    text: node => new TextNodeWrapper(node as TextNode)
};
