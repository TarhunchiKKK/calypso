import type { ResizableNodeStrategy } from "@/board-editor/modules/resizing";
import { ResizableRectNodeStrategy } from "../../shared/strategies/resizable-rect-node-strategy";
import { ResizableArrowStrategy } from "../../variants/arrow/strategies/resizable.strategy";
import type { StrategiesMap } from "./types";

export const ResizableStrategiesMap: StrategiesMap<typeof ResizableNodeStrategy> = {
    sticker: handler => new ResizableRectNodeStrategy(handler),
    arrow: handler => new ResizableArrowStrategy(handler),
    text: handler => new ResizableRectNodeStrategy(handler),
    shape: handler => new ResizableRectNodeStrategy(handler)
};
