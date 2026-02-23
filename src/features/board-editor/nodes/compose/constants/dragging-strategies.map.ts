import type { NodeDraggingStrategy } from "@/features/board-editor/modules/dragging";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { RectNodeDraggingStrategy } from "../../variants/shared";
import type { NodeTypes } from "@/features/board-editor/core";

export const DraggingStrategiesMap: Record<NodeTypes, ConstructorFunction<typeof NodeDraggingStrategy>> = {
    sticker: () => new RectNodeDraggingStrategy(),
    text: () => new RectNodeDraggingStrategy()
};
