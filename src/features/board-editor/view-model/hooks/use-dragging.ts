import React, { useState } from "react";
import { Geometry, Offset, Point } from "../../domain/geometry";
import { ViewModelParams } from "../types";
import { switchToDragging } from "../variants/dragging";

const DRAGGING_MIN_DIFF = 5;

export function useDragging({ viewState, setViewState, canvasRect }: ViewModelParams, initialPoint?: Point) {
    const [startPoint, setStartPoint] = useState(initialPoint);
    const [offset, setOffset] = useState<Offset>();

    const onMouseDown = (e: React.MouseEvent) => {
        setStartPoint({ x: e.clientX, y: e.clientY });
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!startPoint) {
            return;
        }

        const currentPoint = Geometry.recalculatePosition({ x: e.clientX, y: e.clientY }, canvasRect);

        if (Geometry.pointsDistance(startPoint, currentPoint) > DRAGGING_MIN_DIFF) {
            if (viewState.type !== "dragging") {
                setViewState(
                    switchToDragging({
                        startPoint: startPoint,
                        selectedIds: viewState.type === "selection" ? viewState.selectedIds : new Set()
                    })
                );
            }

            setOffset(Geometry.calculateOffset(startPoint, currentPoint));
        }
    };

    const onMouseUp = () => {
        setStartPoint(undefined);
        setOffset(undefined);
    };

    return { offset, onMouseDown, onMouseMove, onMouseUp };
}
