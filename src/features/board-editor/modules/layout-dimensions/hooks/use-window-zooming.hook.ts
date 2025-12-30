import { Geometry, Rect } from "@/features/board-editor/lib/geometry";
import { useState } from "react";
import { LayoutOffsetModel } from "./use-layout-offset.hook";
import { applyLayoutDimensions } from "../lib/geometry.lib";

const defaultLayoutZoom = 1.0;
const zoomUp = 1.1;
const zoomDown = 0.9;

export function useLayoutZoom(layoutOffset: LayoutOffsetModel, canvasRect?: Rect) {
    const [zoom, setZoom] = useState(defaultLayoutZoom);

    const handleZoom = (e: WheelEvent) => {
        const delta = e.deltaY > 0 ? zoomDown : zoomUp;

        const newZoom = zoom * delta;

        const currentMousePoint = applyLayoutDimensions(
            { x: e.clientX, y: e.clientY },
            canvasRect,
            layoutOffset.offset,
            zoom
        );

        const newMousePoint = applyLayoutDimensions(
            { x: e.clientX, y: e.clientY },
            canvasRect,
            layoutOffset.offset,
            newZoom
        );

        const mouseDiff = Geometry.calculateOffset(currentMousePoint, newMousePoint);

        layoutOffset.setOffset(prev => ({
            dx: prev.dx - mouseDiff.dx,
            dy: prev.dy - mouseDiff.dy
        }));

        setZoom(newZoom);
    };

    return { zoom, handleZoom };
}
