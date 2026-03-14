import type { NodeDraggingStrategy } from "@/board-editor/modules/dragging";
import type { NodeTypes } from "@/entities/nodes";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { RectNodeDraggingStrategy } from "../../variants/shared";

export const DraggingStrategiesMap: Record<NodeTypes, ConstructorFunction<typeof NodeDraggingStrategy>> = {
    sticker: () => new RectNodeDraggingStrategy(),
    text: () => new RectNodeDraggingStrategy(),
    shape: () => new RectNodeDraggingStrategy()
};
