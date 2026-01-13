import type { NodeTypes } from "@/features/board-editor/core";
import type { ResizeStrategy } from "@/features/board-editor/modules/resizing";
import type { ConstructorFunction } from "@/shared/lib/typescript";
import { StickerNodeResizeStrategy } from "../../variants/sticker/lib/resize.strategy";

export const ResizeStrategiesMap: Record<NodeTypes, ConstructorFunction<typeof ResizeStrategy>> = {
    sticker: handler => new StickerNodeResizeStrategy(handler)
};
