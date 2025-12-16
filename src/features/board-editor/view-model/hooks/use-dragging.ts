import React, { useState } from "react";
import { Geometry, Offset, Point } from "../../domain/geometry";
import { ViewModelParams } from "../types";
import { switchToDragging } from "../variants/dragging/switcher";
import { DraggingViewState } from "../variants/dragging/view-state";
import { switchToSelection } from "../variants/selection/switcher";
import { SelectionViewState } from "../variants/selection/view-state";

const DRAGGING_MIN_DIFF = 5;

export function useDragging({ nodesModel, setViewState, canvasRect }: ViewModelParams) {
    const [startPoint, setStartPoint] = useState<Point>();
    const [offset, setOffset] = useState<Offset>();

    const onMouseDown = (viewState: SelectionViewState, e: React.MouseEvent) => {
        if (viewState.skipNextClick) {
            setViewState({ ...viewState, skipNextClick: undefined });
            return;
        }

        const currentPoint = { x: e.clientX, y: e.clientY };
        setStartPoint(Geometry.recalculatePosition(currentPoint, canvasRect));
    };

    const onWindowMouseMove = (viewState: SelectionViewState | DraggingViewState, e: MouseEvent) => {
        const start = viewState.type === "dragging" && viewState.startPoint ? viewState.startPoint : startPoint;

        if (!start) {
            return;
        }

        console.log("dragging");

        const currentPoint = Geometry.recalculatePosition({ x: e.clientX, y: e.clientY }, canvasRect);

        if (Geometry.pointsDistance(start, currentPoint) > DRAGGING_MIN_DIFF) {
            if (viewState.type === "selection") {
                setViewState(
                    switchToDragging({
                        startPoint: start,
                        selectedIds: viewState.selectedIds
                    })
                );
                reset();
                return;
            }

            setOffset(Geometry.calculateOffset(start, currentPoint));
        }
    };

    const onWindowMouseUp = (viewState: DraggingViewState) => {
        nodesModel.setNodes(
            nodesModel.nodes.map(node =>
                viewState.selectedIds.has(node.id)
                    ? node.clone().moveTo(Geometry.applyOffset(node.rect(), offset))
                    : node.clone()
            )
        );

        setViewState(
            switchToSelection({
                selectedIds: viewState.selectedIds,
                skipNextClick: true
            })
        );

        reset();
    };

    const reset = () => {
        setStartPoint(undefined);
        setOffset(undefined);
    };

    return { startPoint, offset, onMouseDown, onWindowMouseMove, onWindowMouseUp, reset };
}
