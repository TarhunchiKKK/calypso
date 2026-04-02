import type { NodeResizingStrategy } from "@/board-editor/modules/resizing";
import { ArrowResizingStrategy } from "../../variants/arrow/strategies/resizing.strategy";
import { RectNodeResizingStrategy } from "../../shared/strategies";
import type { StrategiesMap } from "./types";

export const ResizingStrategiesMap: StrategiesMap<typeof NodeResizingStrategy> = {
    sticker: handler => new RectNodeResizingStrategy(handler),
    arrow: handler => new ArrowResizingStrategy(handler),
    text: handler => new RectNodeResizingStrategy(handler),
    shape: handler => new RectNodeResizingStrategy(handler)
};
