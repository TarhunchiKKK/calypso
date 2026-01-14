import type { NodeTypes } from "@/features/board-editor/core";
import type { EditNodeStrategy } from "@/features/board-editor/modules/editing";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { EditStickerNodeStrategy } from "../../variants/sticker/lib/editing.strategy";

export const EditStrategiesMap: Record<NodeTypes, ConstructorFunction<typeof EditNodeStrategy>> = {
    sticker: handler => new EditStickerNodeStrategy(handler),
    // REFACTOR: when `EditTextNodeStrategy` will be created
    text: handler => null as any
};
