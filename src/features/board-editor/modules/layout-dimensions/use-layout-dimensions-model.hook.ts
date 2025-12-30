import { useCanvasRect } from "./hooks/use-canvas-rect.hook";
import { useLayoutDimensions } from "./hooks/use-layout-dimensions.hook";

export function useLayoutDimensionsModel() {
    const canvas = useCanvasRect();

    const { offset, zoom } = useLayoutDimensions(canvas.rect);

    return { canvas, layoutOffset: offset, layoutZoom: zoom };
}

export type LayoutDimensionsModel = ReturnType<typeof useLayoutDimensionsModel>;
