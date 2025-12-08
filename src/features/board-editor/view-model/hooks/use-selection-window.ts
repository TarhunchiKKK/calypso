import React, { useState } from "react";
import { Geometry, Point } from "../../domain/geometry";
import { ViewModel, ViewModelParams } from "../types";

const SELECTION_WINDOW_MIN_DIFF = 20;

export function useSelectionWindow(canvasRect: ViewModelParams["canvasRect"]) {
    const [startPoint, setStartPoint] = useState<Point>();
    const [selectionWindowRect, setSelectionWindowRect] = useState<ViewModel["selectionWindow"] | undefined>(undefined);

    const onMouseDown = (e: React.MouseEvent) => {
        setStartPoint(Geometry.recalculatePosition({ x: e.clientX, y: e.clientY }, canvasRect));
        setSelectionWindowRect(undefined);
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!startPoint) {
            return;
        }

        const currentPoint = Geometry.recalculatePosition({ x: e.clientX, y: e.clientY }, canvasRect);

        if (Geometry.pointsDistance(startPoint, currentPoint) > SELECTION_WINDOW_MIN_DIFF) {
            setSelectionWindowRect(Geometry.rectFromPoints(startPoint, currentPoint));
        }
    };

    const onMouseUp = () => {
        setStartPoint(undefined);
        setSelectionWindowRect(undefined);
    };

    return { rect: selectionWindowRect, onMouseDown, onMouseMove, onMouseUp };
}
