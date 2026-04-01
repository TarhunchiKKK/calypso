import type { NodeResizingStrategy } from "@/board-editor/modules/resizing";
import { RectNodeResizingStrategy } from "../../variants/shared/strategies";
import type { StrategiesMap } from "./types";

export const ResizingStrategiesMap: StrategiesMap<typeof NodeResizingStrategy> = {
    sticker: handler => new RectNodeResizingStrategy(handler),
    arrow: null,
    text: handler => new RectNodeResizingStrategy(handler),
    shape: handler => new RectNodeResizingStrategy(handler)
};
