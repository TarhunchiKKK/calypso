import type { ResizableNodeStrategy } from "@/board-editor/modules/resizing";
import { ResizableRectNodeStrategy } from "../../shared/strategies/resizable-rect-node.strategy";
import { ResizableArrowStrategy } from "../../variants/arrow/strategies/resizable.strategy";
import type { StrategiesMap } from "./types";

const ResizableRectNodeStrategyInstance = new ResizableRectNodeStrategy({
    main: true,
    cross: true
});

const FullyResizableNodeStrategyInstance = new ResizableRectNodeStrategy({
    main: true,
    cross: true,
    diagonal: true
});

export const ResizableStrategiesMap: StrategiesMap<ResizableNodeStrategy> = {
    sticker: FullyResizableNodeStrategyInstance,
    arrow: new ResizableArrowStrategy(),
    text: FullyResizableNodeStrategyInstance,
    shape: ResizableRectNodeStrategyInstance,
    media: ResizableRectNodeStrategyInstance,
    note: FullyResizableNodeStrategyInstance,
    drawing: FullyResizableNodeStrategyInstance
};
