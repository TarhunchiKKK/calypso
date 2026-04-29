import type { NodeSelectionStrategy } from "@/board-editor/modules/selection";
import { RectNodeSelectionStrategy } from "../../shared/strategies";
import { ArrowSelectionStrategy } from "../../variants/arrow/strategies/selection.strategy";
import type { StrategiesMap } from "./types";

const RectNodeSelectionStrategyInstance = new RectNodeSelectionStrategy();

export const SelectionStrategiesMap: StrategiesMap<NodeSelectionStrategy> = {
    sticker: RectNodeSelectionStrategyInstance,
    arrow: new ArrowSelectionStrategy(),
    text: RectNodeSelectionStrategyInstance,
    shape: RectNodeSelectionStrategyInstance,
    media: RectNodeSelectionStrategyInstance
};
