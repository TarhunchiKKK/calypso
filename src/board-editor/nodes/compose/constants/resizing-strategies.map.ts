import type { NodeTypes } from "@/board-editor/core";
import type { NodeResizingStrategy } from "@/board-editor/modules/resizing";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { RectNodeResizingStrategy } from "../../variants/shared";

export const ResizingStrategiesMap: Record<NodeTypes, ConstructorFunction<typeof NodeResizingStrategy>> = {
    sticker: handler => new RectNodeResizingStrategy(handler),
    text: handler => new RectNodeResizingStrategy(handler),
    shape: handler => new RectNodeResizingStrategy(handler)
};
