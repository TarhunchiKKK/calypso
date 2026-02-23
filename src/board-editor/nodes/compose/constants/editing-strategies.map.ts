import type { NodeTypes } from "@/board-editor/core";
import type { NodeEditingStrategy } from "@/board-editor/modules/editing";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { EditStickerNodeStrategy } from "../../variants/sticker/lib/editing.strategy";
import { EditTextNodeStrategy } from "../../variants/text/lib/editing.strategy";

export const EditingStrategiesMap: Record<NodeTypes, ConstructorFunction<typeof NodeEditingStrategy> | null> = {
    sticker: handler => new EditStickerNodeStrategy(handler),
    text: handler => new EditTextNodeStrategy(handler),
    shape: null
};
