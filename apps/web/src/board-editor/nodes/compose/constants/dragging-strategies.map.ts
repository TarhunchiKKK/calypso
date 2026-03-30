import type { NodeDraggingStrategy } from "@/board-editor/modules/dragging";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { RectNodeDraggingStrategy } from "../../variants/shared";
import type { Boards } from "@repo/common";

export const DraggingStrategiesMap: Record<Boards.NodeTypes, ConstructorFunction<typeof NodeDraggingStrategy>> = {
    sticker: () => new RectNodeDraggingStrategy(),
    arrow: () => new RectNodeDraggingStrategy(),
    text: () => new RectNodeDraggingStrategy(),
    shape: () => new RectNodeDraggingStrategy()
};
