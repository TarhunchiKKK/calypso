import type { NodeResizingStrategy } from "@/board-editor/modules/resizing";
import { RectNodeResizingStrategy } from "../../shared/strategies";
import type { StrategiesMap } from "./types";

const RectNodeResizingStrategyInstance = new RectNodeResizingStrategy();

export const ResizingStrategiesMap: StrategiesMap<NodeResizingStrategy> = {
    sticker: RectNodeResizingStrategyInstance,
    arrow: null,
    text: RectNodeResizingStrategyInstance,
    shape: RectNodeResizingStrategyInstance,
    media: RectNodeResizingStrategyInstance
};
