import type { NodeEditingStrategy } from "@/features/board-editor/modules/editing";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { EditStickerNodeStrategy } from "../../variants/sticker/lib/editing.strategy";
import { EditTextNodeStrategy } from "../../variants/text/lib/editing.strategy";
import type { NodeTypes } from "@/features/board-editor/core";

export const EditingStrategiesMap: Record<NodeTypes, ConstructorFunction<typeof NodeEditingStrategy>> = {
    sticker: handler => new EditStickerNodeStrategy(handler),
    text: handler => new EditTextNodeStrategy(handler)
};
