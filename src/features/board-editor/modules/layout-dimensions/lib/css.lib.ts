import { Offset } from "@/features/board-editor/core";

export function createLayoutDimensionsStyles(offset: Offset, zoom: number) {
    return {
        "--x": -offset.dx * zoom + "px",
        "--y": -offset.dy * zoom + "px",
        "--zoom": zoom
    } as React.CSSProperties;
}
