import { NodeTypes } from "@/features/board-editor/core";
import { EditNodeStrategy } from "@/features/board-editor/modules/editing";
import { EditStickerNodeStrategy } from "../../variants/sticker/lib/editing.strategy";
import { ConstructorFunction } from "@/shared/lib/typescript";

export const EditStrategiesMap: Record<NodeTypes, ConstructorFunction<typeof EditNodeStrategy>> = {
    sticker: handler => new EditStickerNodeStrategy(handler)
};
