import { NodeTypes, NodeWrapper } from "@/features/board-editor/core";
import { StickerNodeWrapper } from "../../variants/sticker/wrapper";
import { AnyNode } from "../types";

export const WrapperConstructorsMap: Record<NodeTypes, new (node: AnyNode) => NodeWrapper> = {
    sticker: StickerNodeWrapper
};
