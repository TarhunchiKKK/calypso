import type { NodeTypes } from "@/features/board-editor/core";
import type { DraggingStrategy } from "@/features/board-editor/modules/dragging";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { RectNodeDraggingStrategy } from "../../variants/shared";

export const DraggingStrategiesMap: Record<NodeTypes, ConstructorFunction<typeof DraggingStrategy>> = {
    sticker: () => new RectNodeDraggingStrategy(),
    text: () => new RectNodeDraggingStrategy()
};
