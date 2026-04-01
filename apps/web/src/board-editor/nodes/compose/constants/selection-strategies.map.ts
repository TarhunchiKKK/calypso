import type { NodeSelectionStrategy } from "@/board-editor/modules/selection";
import { RectNodeSelectionStrategy } from "../../variants/shared/strategies";
import type { StrategiesMap } from "./types";
import { ArrowSelectionStrategy } from "../../variants/arrow/strategies/selection.strategy";

export const SelectionStrategiesMap: StrategiesMap<typeof NodeSelectionStrategy> = {
    sticker: () => new RectNodeSelectionStrategy(),
    arrow: () => new ArrowSelectionStrategy(),
    text: () => new RectNodeSelectionStrategy(),
    shape: () => new RectNodeSelectionStrategy()
};
