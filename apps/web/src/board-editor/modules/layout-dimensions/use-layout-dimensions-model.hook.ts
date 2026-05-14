import type { Point } from "@repo/common";
import { useRef, useState } from "react";
import { useLastClick } from "@/shared/lib/events";
import { Geometry } from "@/shared/lib/geometry";
import { DefaultLayoutOffset, DefaultLayoutZoom, ZoomDown, ZoomUp } from "./layout-dimensions.constants";

export function useLayoutDimensionsModel() {
    const [offset, setOffset] = useState(DefaultLayoutOffset);
    const [zoom, setZoom] = useState(DefaultLayoutZoom);
    const startPointRef = useRef<Point | undefined>(undefined);
    const lastClick = useLastClick();

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
        const delta = e.deltaY > 0 ? ZoomDown : ZoomUp;
        const newZoom = zoom * delta;

        const currentMousePoint = applyForPoint(zoom, Geometry.pointFromEvent(e));

        const newMousePoint = applyForPoint(newZoom, Geometry.pointFromEvent(e));

        const mouseDiff = Geometry.calculateOffset(currentMousePoint, newMousePoint);

        setOffset(prev => ({
            dx: prev.dx - mouseDiff.dx,
            dy: prev.dy - mouseDiff.dy
        }));

        setZoom(newZoom);
    };

    const applyForPoint = (zoom: number, point: Point) => {
        return {
            x: point.x / zoom + offset.dx,
            y: point.y / zoom + offset.dy
        };
    };

    return {
        layoutOffset: { offset, setOffset, isShifting, startShifting, shift, endShifting },
        layoutZoom: { zoom, handleZoom },
        applyForPoint: applyForPoint.bind(null, zoom),
        lastClick: {
            point: lastClick.point ? applyForPoint(zoom, lastClick.point) : undefined,
            handle: lastClick.handle
        }
    };
}

export type LayoutDimensionsModel = ReturnType<typeof useLayoutDimensionsModel>;
