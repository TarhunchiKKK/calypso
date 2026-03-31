import type { Boards } from "@repo/common";
import type { NodeResizingStrategy } from "@/board-editor/modules/resizing";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { RectNodeResizingStrategy } from "../../variants/shared/strategies";

export const ResizingStrategiesMap: Record<Boards.NodeTypes, ConstructorFunction<typeof NodeResizingStrategy> | null> =
    {
        sticker: handler => new RectNodeResizingStrategy(handler),
        arrow: null,
        text: handler => new RectNodeResizingStrategy(handler),
        shape: handler => new RectNodeResizingStrategy(handler)
    };
