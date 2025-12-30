import { Geometry, Rect } from "@/features/board-editor/lib/geometry";
import { useState } from "react";
import { applyLayoutShift2 } from "../geometry.lib";
import { WindowShiftModel } from "../window-shifting/use-window-shift.hook";

const defaultWindowZoom = 1.0;
const zoomUp = 1.1;
const zoomDown = 0.9;

export function useWindowZooming(windowShift: WindowShiftModel, canvasRect?: Rect) {
    const [zoom, setZoom] = useState(defaultWindowZoom);

    const handleZoom = (e: WheelEvent) => {
        const delta = e.deltaY > 0 ? zoomDown : zoomUp;

        const newZoom = zoom * delta;

        const currentMousePoint = applyLayoutShift2(
            { x: e.clientX, y: e.clientY },
            canvasRect,
            windowShift.windowShift,
            zoom
        );

        const newMousePoint = applyLayoutShift2(
            { x: e.clientX, y: e.clientY },
            canvasRect,
            windowShift.windowShift,
            newZoom
        );

        const mouseDiff = Geometry.calculateOffset(currentMousePoint, newMousePoint);

        windowShift.setWindowShift(prev => ({
            dx: prev.dx - mouseDiff.dx,
            dy: prev.dy - mouseDiff.dy
        }));

        setZoom(newZoom);
    };

    return { zoom, handleZoom };
}
