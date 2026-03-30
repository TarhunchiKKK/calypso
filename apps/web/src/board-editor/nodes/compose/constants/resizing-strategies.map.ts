import type { NodeResizingStrategy } from "@/board-editor/modules/resizing";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { RectNodeResizingStrategy } from "../../variants/shared";
import type { Boards } from "@repo/common";

export const ResizingStrategiesMap: Record<Boards.NodeTypes, ConstructorFunction<typeof NodeResizingStrategy>> = {
    sticker: handler => new RectNodeResizingStrategy(handler),
    arrow: handler => new RectNodeResizingStrategy(handler),
    text: handler => new RectNodeResizingStrategy(handler),
    shape: handler => new RectNodeResizingStrategy(handler)
};
