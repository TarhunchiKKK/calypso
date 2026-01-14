import type { NodeTypes } from "@/features/board-editor/core";
import type { EditNodeStrategy } from "@/features/board-editor/modules/editing";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { EditStickerNodeStrategy } from "../../variants/sticker/lib/editing.strategy";
import { EditTextNodeStrategy } from "../../variants/text/lib/editing.strategy";

export const EditStrategiesMap: Record<NodeTypes, ConstructorFunction<typeof EditNodeStrategy>> = {
    sticker: handler => new EditStickerNodeStrategy(handler),
    text: handler => new EditTextNodeStrategy(handler)
};
