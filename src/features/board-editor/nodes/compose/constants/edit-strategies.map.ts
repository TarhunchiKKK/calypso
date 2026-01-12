import { NodeBase, NodeTypes } from "@/features/board-editor/core";
import { EditNodeStrategy } from "@/features/board-editor/modules/editing";
import { EditStickerNodeStrategy } from "../../variants/sticker/lib/editing.strategy";

export const EditStrategiesMap: Record<NodeTypes, (handler: (node: NodeBase) => void) => EditNodeStrategy> = {
    sticker: handler => new EditStickerNodeStrategy(handler)
};
