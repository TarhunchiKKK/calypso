import React, { useState } from "react";
import { Geometry, Offset, Point } from "../../domain/geometry";
import { ViewModelParams } from "../types";
import { DraggingViewState, switchToDragging } from "../variants/dragging";
import { SelectionViewState, switchToSelection } from "../variants/selection";

const DRAGGING_MIN_DIFF = 5;

export function useDragging({ setViewState, canvasRect }: ViewModelParams) {
    const [startPoint, setStartPoint] = useState<Point>();
    const [offset, setOffset] = useState<Offset>();

    const onMouseDown = (e: React.MouseEvent) => {
        setStartPoint({ x: e.clientX, y: e.clientY });
    };

    const onMouseMove = (viewState: SelectionViewState | DraggingViewState, e: MouseEvent) => {
        const start = viewState.type === "dragging" && viewState.startPoint ? viewState.startPoint : startPoint;

        if (!start) {
            return;
        }

        const currentPoint = Geometry.recalculatePosition({ x: e.clientX, y: e.clientY }, canvasRect);

        if (Geometry.pointsDistance(start, currentPoint) > DRAGGING_MIN_DIFF) {
            if (viewState.type === "selection") {
                setViewState(
                    switchToDragging({
                        startPoint: start,
                        selectedIds: viewState.selectedIds
                    })
                );
            }

            setOffset(Geometry.calculateOffset(start, currentPoint));
        }
    };

    const onMouseUp = (viewState: SelectionViewState | DraggingViewState) => {
        if (viewState.type === "dragging") {
            setViewState(
                switchToSelection({
                    selectedIds: viewState.selectedIds
                })
            );
        }

        setStartPoint(undefined);
        setOffset(undefined);
    };

    return { offset, onMouseDown, onMouseMove, onMouseUp };
}
