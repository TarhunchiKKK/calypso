import type { NodeTypes, NodeWrapper } from "@/features/board-editor/core";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import type { StickerNode } from "../../variants/sticker/type";
import { StickerNodeWrapper } from "../../variants/sticker/wrapper";

export const WrapperConstructorsMap: Record<NodeTypes, ConstructorFunction<typeof NodeWrapper>> = {
    sticker: node => new StickerNodeWrapper(node as StickerNode)
};
