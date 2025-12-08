import React, { useState } from "react";
import { Geometry, Point } from "../../domain/geometry";
import { ViewModel } from "../types";

export function useSelectionWindow() {
    const [startPoint, setStartPoint] = useState<Point>();
    const [selectionWindowRect, setSelectionWindowRect] = useState<ViewModel["selectionWindow"] | undefined>(undefined);

    const onMouseDown = (e: React.MouseEvent) => {
        setStartPoint({ x: e.clientX, y: e.clientY });
        setSelectionWindowRect(undefined);
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!startPoint) {
            return;
        }

        const currentPoint = { x: e.clientX, y: e.clientY };

        if (Geometry.pointsDistance(startPoint, currentPoint) > 20) {
            setSelectionWindowRect(Geometry.rectFromPoints(startPoint, currentPoint));
        }
    };

    const onMouseUp = () => {
        setStartPoint(undefined);
        setSelectionWindowRect(undefined);
    };

    return { rect: selectionWindowRect, onMouseDown, onMouseMove, onMouseUp };
}
