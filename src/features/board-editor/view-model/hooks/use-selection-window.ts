import React, { useState } from "react";
import { Geometry, Point, Rect } from "../../domain/geometry";
import { ViewModelParams } from "../types";
import { SelectionViewState, switchToSelection } from "../variants/selection";
import { IdleViewState } from "../variants/idle";

const SELECTION_WINDOW_MIN_DIFF = 20;

export function useSelectionWindow({ nodesModel, canvasRect, setViewState }: ViewModelParams, initialPoint?: Point) {
    const [startPoint, setStartPoint] = useState(initialPoint);
    const [selectionWindowRect, setSelectionWindowRect] = useState<Rect>();

    let selectedNodesIds: string[] = [];
    if (selectionWindowRect) {
        selectedNodesIds = nodesModel.nodes
            .filter(node => Geometry.rectsIntersecting(selectionWindowRect, node.rect()))
            .map(node => node.id);
    }

    const onOverlayMouseDown = (e: React.MouseEvent) => {
        setStartPoint(Geometry.recalculatePosition({ x: e.clientX, y: e.clientY }, canvasRect));
        setSelectionWindowRect(undefined);
    };

    const onWindowMouseMove = (viewState: IdleViewState | SelectionViewState, e: MouseEvent) => {
        if (!startPoint) {
            return;
        }

        const currentPoint = Geometry.recalculatePosition({ x: e.clientX, y: e.clientY }, canvasRect);

        if (Geometry.pointsDistance(startPoint, currentPoint) > SELECTION_WINDOW_MIN_DIFF) {
            if (viewState.type === "idle") {
                setViewState(switchToSelection());
                setStartPoint(undefined);
                setSelectionWindowRect(undefined);
                return;
            }

            setSelectionWindowRect(Geometry.rectFromPoints(startPoint, currentPoint));
        }
    };

    const onWindowMouseUp = (viewState: IdleViewState | SelectionViewState) => {
        if (viewState.type === "selection" && selectionWindowRect) {
            setViewState({
                ...viewState,
                selectedIds: new Set([...Array.from(viewState.selectedIds), ...selectedNodesIds])
            });
        }

        setStartPoint(undefined);
        setSelectionWindowRect(undefined);
    };

    return {
        rect: selectionWindowRect,
        selectedNodesIds: new Set(selectedNodesIds),
        onOverlayMouseDown,
        onWindowMouseMove,
        onWindowMouseUp
    };
}
