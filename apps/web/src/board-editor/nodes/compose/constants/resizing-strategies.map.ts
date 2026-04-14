import type { NodeResizingStrategy } from "@/board-editor/modules/resizing";
import { RectNodeResizingStrategy } from "../../shared/strategies";
import type { StrategiesMap } from "./types";

export const ResizingStrategiesMap: StrategiesMap<typeof NodeResizingStrategy> = {
    sticker: () => new RectNodeResizingStrategy(),
    arrow: null,
    text: () => new RectNodeResizingStrategy(),
    shape: () => new RectNodeResizingStrategy(),
    media: () => new RectNodeResizingStrategy()
};
