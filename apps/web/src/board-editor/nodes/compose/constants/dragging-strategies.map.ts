import type { NodeDraggingStrategy } from "@/board-editor/modules/dragging";
import { RectNodeDraggingStrategy } from "../../shared/strategies";
import { ArrowDraggingStrategy } from "../../variants/arrow/strategies/dragging.strategy";
import type { StrategiesMap } from "./types";

const RectNodeDraggingStrategyInstance = new RectNodeDraggingStrategy();

export const DraggingStrategiesMap: StrategiesMap<NodeDraggingStrategy> = {
    sticker: RectNodeDraggingStrategyInstance,
    arrow: new ArrowDraggingStrategy(),
    text: RectNodeDraggingStrategyInstance,
    shape: RectNodeDraggingStrategyInstance,
    media: RectNodeDraggingStrategyInstance,
    note: RectNodeDraggingStrategyInstance
};
