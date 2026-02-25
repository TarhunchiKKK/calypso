import { useRef, useState } from "react";
import { Geometry, type Offset, type Point } from "@/shared/lib/geometry";

// REFACTOR: move constants to separate file
const defaultLayoutOffset: Offset = {
    dx: 0,
    dy: 0
};

const defaultLayoutZoom = 1.0;
const zoomUp = 1.1;
const zoomDown = 0.9;

export function useLayoutDimensionsModel() {
    const [offset, setOffset] = useState(defaultLayoutOffset);
    const [zoom, setZoom] = useState(defaultLayoutZoom);
    const startPointRef = useRef<Point | undefined>(undefined);

    const isShifting = (e: React.MouseEvent) => {
        return e.button === 2;
    };

    const startShifting = (e: React.MouseEvent) => {
        if (isShifting(e)) {
            startPointRef.current = {
                x: e.clientX,
                y: e.clientY
            };
        }
    };

    const shift = (e: MouseEvent) => {
        if (!startPointRef.current) {
            return;
        }

        const currentPoint = {
            x: e.clientX,
            y: e.clientY
        };

        const newOffset = Geometry.calculateOffset(startPointRef.current, currentPoint);

        startPointRef.current = currentPoint;
        setOffset(prev => ({
            dx: prev.dx - newOffset.dx,
            dy: prev.dy - newOffset.dy
        }));
    };

    const endShifting = () => {
        startPointRef.current = undefined;
    };

    const handleZoom = (e: WheelEvent) => {
        const delta = e.deltaY > 0 ? zoomDown : zoomUp;

        const newZoom = zoom * delta;

        const currentMousePoint = applyForPoint(Geometry.pointFromEvent(e));

        const newMousePoint = applyForPoint(Geometry.pointFromEvent(e));

        const mouseDiff = Geometry.calculateOffset(currentMousePoint, newMousePoint);

        setOffset(prev => ({
            dx: prev.dx - mouseDiff.dx,
            dy: prev.dy - mouseDiff.dy
        }));

        setZoom(newZoom);
    };

    const applyForPoint = (point: Point) => {
        return {
            x: point.x / zoom + offset.dx,
            y: point.y / zoom + offset.dy
        };
    };

    return {
        layoutOffset: { offset, setOffset, isShifting, startShifting, shift, endShifting },
        layoutZoom: { zoom, handleZoom },
        applyForPoint
    };
}

export type LayoutDimensionsModel = ReturnType<typeof useLayoutDimensionsModel>;
