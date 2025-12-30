import React, { useState } from "react";
import { Geometry, Offset, Point } from "@/features/board-editor/lib/geometry";

const defaultLayoutOffset: Offset = {
    dx: 0,
    dy: 0
};

export function useLayoutOffset() {
    const [offset, setOffset] = useState(defaultLayoutOffset);
    const [startPoint, setStartPoint] = useState<Point>();

    const is = (e: React.MouseEvent) => {
        return e.button === 2;
    };

    const startShifting = (e: React.MouseEvent) => {
        if (is(e)) {
            setStartPoint({
                x: e.clientX,
                y: e.clientY
            });
        }
    };

    const shift = (e: MouseEvent) => {
        if (!startPoint) {
            return;
        }

        const currentPoint = {
            x: e.clientX,
            y: e.clientY
        };

        const offset = Geometry.calculateOffset(startPoint, currentPoint);

        setOffset(offset);
    };

    const endShifting = () => {
        setStartPoint(undefined);
    };

    return { offset, setOffset, is, startShifting, shift, endShifting };
}

export type LayoutOffsetModel = ReturnType<typeof useLayoutOffset>;
