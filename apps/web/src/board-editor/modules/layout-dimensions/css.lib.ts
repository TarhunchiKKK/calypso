import type { LayoutDimensions } from "./use-layout-dimensions-model.hook";

export function createLayoutDimensionsStyles(dimensions: LayoutDimensions) {
    return {
        "--x": `${-dimensions.offset.dx * dimensions.zoom}px`,
        "--y": `${-dimensions.offset.dy * dimensions.zoom}px`,
        "--zoom": dimensions.zoom
    } as React.CSSProperties;
}
