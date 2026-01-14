import { useCanvasRect } from "./use-canvas-rect.hook";
import { useLayoutDimensions } from "./use-layout-dimensions.hook";

export function useLayoutDimensionsModel() {
    const canvas = useCanvasRect();

    const { offset, zoom } = useLayoutDimensions(canvas.rect);

    return { canvas, layoutOffset: offset, layoutZoom: zoom };
}

export type LayoutDimensionsModel = ReturnType<typeof useLayoutDimensionsModel>;
