import type { NodeSelectionStrategy } from "@/board-editor/modules/selection";
import { RectNodeSelectionStrategy } from "../../shared/strategies";
import { ArrowSelectionStrategy } from "../../variants/arrow/strategies/selection.strategy";
import type { StrategiesMap } from "./types";

export const SelectionStrategiesMap: StrategiesMap<typeof NodeSelectionStrategy> = {
    sticker: () => new RectNodeSelectionStrategy(),
    arrow: () => new ArrowSelectionStrategy(),
    text: () => new RectNodeSelectionStrategy(),
    shape: () => new RectNodeSelectionStrategy(),
    media: () => new RectNodeSelectionStrategy()
};
