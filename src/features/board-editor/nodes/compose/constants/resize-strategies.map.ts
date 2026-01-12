import { ResizeStrategy } from "@/features/board-editor/modules/resizing";
import { StickerNodeResizeStrategy } from "../../variants/sticker/lib/resize.strategy";
import { NodeTypes } from "@/features/board-editor/core";
import { ConstructorFunction } from "@/shared/lib/typescript";

export const ResizeStrategiesMap: Record<NodeTypes, ConstructorFunction<typeof ResizeStrategy>> = {
    sticker: handler => new StickerNodeResizeStrategy(handler)
};
