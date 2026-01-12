import { ResizeHandler, ResizeStrategy } from "@/features/board-editor/modules/resizing";
import { StickerNodeResizeStrategy } from "../../variants/sticker/lib/resize.strategy";
import { NodeTypes } from "@/features/board-editor/core";

export const ResizeStrategiesMap: Record<NodeTypes, new (nodeId: string, handler?: ResizeHandler) => ResizeStrategy> = {
    sticker: StickerNodeResizeStrategy
};
