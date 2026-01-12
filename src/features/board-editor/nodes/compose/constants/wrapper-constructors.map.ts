import { NodeTypes, NodeWrapper } from "@/features/board-editor/core";
import { StickerNodeWrapper } from "../../variants/sticker/wrapper";
import { StickerNode } from "../../variants/sticker/type";
import { ConstructorFunction } from "@/shared/lib/typescript";

export const WrapperConstructorsMap: Record<NodeTypes, ConstructorFunction<typeof NodeWrapper>> = {
    sticker: node => new StickerNodeWrapper(node as StickerNode)
};
