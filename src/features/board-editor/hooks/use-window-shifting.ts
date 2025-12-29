import React, { useState } from "react";
import { Geometry, Point } from "../domain/geometry";

type WindowShift = {
    x: number;
    y: number;
};

const defaultWindowShift: WindowShift = {
    x: 0,
    y: 0
};

export function useWindowShifting() {
    const [windowShift, setWindowShift] = useState<WindowShift>(defaultWindowShift);
    const [startPoint, setStartPoint] = useState<Point>();

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button === 2) {
            setStartPoint({
                x: e.clientX,
                y: e.clientY
            });
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!startPoint) {
            return;
        }

        const currentPoint = {
            x: e.clientX,
            y: e.clientY
        };

        const offset = Geometry.calculateOffset(startPoint, currentPoint);

        setWindowShift({
            x: offset.dx,
            y: offset.dy
        });
    };

    const handleMouseUp = () => {
        setStartPoint(undefined);
    };

    return { windowShift, setWindowShift, handleMouseDown, handleMouseMove, handleMouseUp };
}

export type WindowShiftingModel = ReturnType<typeof useWindowShifting>;
