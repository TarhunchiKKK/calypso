import type { NodeDraggingStrategy } from "@/board-editor/modules/dragging";
import { RectNodeDraggingStrategy } from "../../shared/strategies";
import { ArrowDraggingStrategy } from "../../variants/arrow/strategies/dragging.strategy";
import type { StrategiesMap } from "./types";

export const DraggingStrategiesMap: StrategiesMap<typeof NodeDraggingStrategy> = {
    sticker: () => new RectNodeDraggingStrategy(),
    arrow: () => new ArrowDraggingStrategy(),
    text: () => new RectNodeDraggingStrategy(),
    shape: () => new RectNodeDraggingStrategy(),
    media: () => new RectNodeDraggingStrategy()
};
