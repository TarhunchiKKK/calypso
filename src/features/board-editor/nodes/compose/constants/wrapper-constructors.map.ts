import { NodeBase, NodeTypes, NodeWrapper } from "@/features/board-editor/core";
import { StickerNodeWrapper } from "../../variants/sticker/wrapper";
import { StickerNode } from "../../variants/sticker/type";

export const WrapperConstructorsMap: Record<NodeTypes, (node: NodeBase) => NodeWrapper> = {
    sticker: node => new StickerNodeWrapper(node as StickerNode)
};
