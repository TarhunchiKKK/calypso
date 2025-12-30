import { Offset } from "@/features/board-editor/lib/geometry";

export function createLayoutDimensionsStyles(offset: Offset, zoom: number) {
    return {
        "--x": -offset.dx * zoom + "px",
        "--y": -offset.dy * zoom + "px",
        "--zoom": zoom
    } as React.CSSProperties;
}
