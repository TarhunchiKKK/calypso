import type { Boards } from "@repo/common";
import type { NodeEditingStrategy } from "@/board-editor/modules/editing";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { StickerEditingStrategy } from "../../variants/sticker/lib/editing.strategy";
import { TextNodeEditingStrategy } from "../../variants/text/lib/editing.strategy";

export const EditingStrategiesMap: Record<Boards.NodeTypes, ConstructorFunction<typeof NodeEditingStrategy> | null> = {
    sticker: handler => new StickerEditingStrategy(handler),
    arrow: null,
    text: handler => new TextNodeEditingStrategy(handler),
    shape: null
};
