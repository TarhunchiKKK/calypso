import type { NodeTypes } from "@/features/board-editor/core";
import { RectNodeResizeStrategy, type ResizeStrategy } from "@/features/board-editor/modules/resizing";
import type { ConstructorFunction } from "@/shared/lib/typescript";

export const ResizeStrategiesMap: Record<NodeTypes, ConstructorFunction<typeof ResizeStrategy>> = {
    sticker: handler => new RectNodeResizeStrategy(handler),
    text: handler => new RectNodeResizeStrategy(handler)
};
