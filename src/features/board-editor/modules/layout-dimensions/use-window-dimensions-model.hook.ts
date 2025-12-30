import { useCanvasRect } from "./hooks/use-canvas-rect.hook";
import { useLayoutOffset } from "./hooks/use-layout-offset.hook";
import { useLayoutZoom } from "./hooks/use-window-zooming.hook";

export function useLayoutDimensionsModel() {
    const canvas = useCanvasRect();

    const layoutOffset = useLayoutOffset();

    const layoutZoom = useLayoutZoom(layoutOffset, canvas.rect);

    return { canvas, layoutOffset, layoutZoom };
}

export type LayoutDimensionsModel = ReturnType<typeof useLayoutDimensionsModel>;
