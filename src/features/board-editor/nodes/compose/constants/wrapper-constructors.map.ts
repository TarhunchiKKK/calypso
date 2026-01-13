import type { NodeTypes, NodeWrapper } from "@/features/board-editor/core";
import { StickerNodeWrapper } from "../../variants/sticker/wrapper";
import type { StickerNode } from "../../variants/sticker/type";
import type { ConstructorFunction } from "@/shared/lib/typescript";

export const WrapperConstructorsMap: Record<NodeTypes, ConstructorFunction<typeof NodeWrapper>> = {
    sticker: node => new StickerNodeWrapper(node as StickerNode)
};
