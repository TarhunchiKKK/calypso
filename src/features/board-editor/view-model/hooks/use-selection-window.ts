import React, { useState } from "react";
import { Geometry, Point } from "../../domain/geometry";
import { ViewModel, ViewModelParams } from "../types";
import { switchToSelection } from "../variants/selection";

const SELECTION_WINDOW_MIN_DIFF = 20;

export function useSelectionWindow(
    { nodesModel, canvasRect, setViewState, viewState }: ViewModelParams,
    initialPoint?: Point
) {
    const [startPoint, setStartPoint] = useState<Point | undefined>(initialPoint);
    const [selectionWindowRect, setSelectionWindowRect] = useState<ViewModel["selectionWindow"] | undefined>(undefined);

    let selectedNodesIds: string[] = [];
    if (selectionWindowRect) {
        selectedNodesIds = nodesModel.nodes
            .filter(node => Geometry.rectsIntersecting(selectionWindowRect, node.rect()))
            .map(node => node.id);
    }

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
            if (viewState.type !== "selection") {
                setViewState(switchToSelection());
            }

            setSelectionWindowRect(Geometry.rectFromPoints(startPoint, currentPoint));
        }
    };

    const onMouseUp = () => {
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
        onMouseDown,
        onMouseMove,
        onMouseUp
    };
}
