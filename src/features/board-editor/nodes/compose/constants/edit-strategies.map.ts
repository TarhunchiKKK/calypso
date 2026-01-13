import type { NodeTypes } from "@/features/board-editor/core";
import type { EditNodeStrategy } from "@/features/board-editor/modules/editing";
import { EditStickerNodeStrategy } from "../../variants/sticker/lib/editing.strategy";
import type { ConstructorFunction } from "@/shared/lib/typescript";

export const EditStrategiesMap: Record<NodeTypes, ConstructorFunction<typeof EditNodeStrategy>> = {
    sticker: handler => new EditStickerNodeStrategy(handler)
};
