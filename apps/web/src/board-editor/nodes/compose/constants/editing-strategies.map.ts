import type { NodeEditingStrategy } from "@/board-editor/modules/editing";
import { ArrowEditingStrategy } from "../../variants/arrow/strategies/editing.strategy";
import { StickerEditingStrategy } from "../../variants/sticker/strategies/editing.strategy";
import { TextNodeEditingStrategy } from "../../variants/text/strategies/editing.strategy";
import type { StrategiesMap } from "./types";

export const EditingStrategiesMap: StrategiesMap<typeof NodeEditingStrategy> = {
    sticker: handler => new StickerEditingStrategy(handler),
    arrow: handler => new ArrowEditingStrategy(handler),
    text: handler => new TextNodeEditingStrategy(handler),
    shape: null,
    media: null
};
