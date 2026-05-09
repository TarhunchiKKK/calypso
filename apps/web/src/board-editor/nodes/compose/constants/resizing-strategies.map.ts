import type { NodeResizingStrategy } from "@/board-editor/modules/resizing";
import { RectNodeResizingStrategy } from "../../shared/strategies";
import type { StrategiesMap } from "./types";
import { DrawingNodeResizingStrategy } from "../../variants/drawing/strategies/resizing.strategy";

const RectNodeResizingStrategyInstance = new RectNodeResizingStrategy();

export const ResizingStrategiesMap: StrategiesMap<NodeResizingStrategy> = {
    sticker: RectNodeResizingStrategyInstance,
    arrow: null,
    text: RectNodeResizingStrategyInstance,
    shape: RectNodeResizingStrategyInstance,
    media: RectNodeResizingStrategyInstance,
    note: RectNodeResizingStrategyInstance,
    drawing: new DrawingNodeResizingStrategy()
};
