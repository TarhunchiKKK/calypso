import type { Boards } from "@repo/common";
import type { NodeDraggingStrategy } from "@/board-editor/modules/dragging";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { RectNodeDraggingStrategy } from "../../variants/shared/strategies";

export const DraggingStrategiesMap: Record<Boards.NodeTypes, ConstructorFunction<typeof NodeDraggingStrategy> | null> =
    {
        sticker: () => new RectNodeDraggingStrategy(),
        arrow: null,
        text: () => new RectNodeDraggingStrategy(),
        shape: () => new RectNodeDraggingStrategy()
    };
