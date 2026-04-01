import type { NodeDraggingStrategy } from "@/board-editor/modules/dragging";
import { ArrowDraggingStrategy } from "../../variants/arrow/strategies/dragging.strategy";
import { RectNodeDraggingStrategy } from "../../variants/shared/strategies";
import type { StrategiesMap } from "./types";

export const DraggingStrategiesMap: StrategiesMap<typeof NodeDraggingStrategy> = {
    sticker: () => new RectNodeDraggingStrategy(),
    arrow: () => new ArrowDraggingStrategy(),
    text: () => new RectNodeDraggingStrategy(),
    shape: () => new RectNodeDraggingStrategy()
};
