import type { ResizableNodeStrategy } from "@/board-editor/modules/resizing";
import { ResizableRectNodeStrategy } from "../../shared/strategies/resizable-rect-node-strategy";
import { ResizableArrowStrategy } from "../../variants/arrow/strategies/resizable.strategy";
import type { StrategiesMap } from "./types";

const ResizableRectNodeStrategyInstance = new ResizableRectNodeStrategy();

export const ResizableStrategiesMap: StrategiesMap<ResizableNodeStrategy> = {
    sticker: ResizableRectNodeStrategyInstance,
    arrow: new ResizableArrowStrategy(),
    text: ResizableRectNodeStrategyInstance,
    shape: ResizableRectNodeStrategyInstance,
    media: ResizableRectNodeStrategyInstance
};
