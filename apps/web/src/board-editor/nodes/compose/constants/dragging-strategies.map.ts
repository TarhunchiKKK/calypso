import type { NodeDraggingStrategy } from "@/board-editor/modules/dragging";
import { RectNodeDraggingStrategy } from "../../variants/shared/strategies";
import type { StrategiesMap } from "./types";

export const DraggingStrategiesMap: StrategiesMap<typeof NodeDraggingStrategy> = {
    sticker: () => new RectNodeDraggingStrategy(),
    arrow: null,
    text: () => new RectNodeDraggingStrategy(),
    shape: () => new RectNodeDraggingStrategy()
};
