import type { NodeResizingStrategy } from "@/features/board-editor/modules/resizing";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { RectNodeResizingStrategy } from "../../variants/shared";
import type { NodeTypes } from "@/features/board-editor/core";

export const ResizingStrategiesMap: Record<NodeTypes, ConstructorFunction<typeof NodeResizingStrategy>> = {
    sticker: handler => new RectNodeResizingStrategy(handler),
    text: handler => new RectNodeResizingStrategy(handler)
};
