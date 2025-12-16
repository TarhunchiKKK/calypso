import React, { useState } from "react";
import { Geometry, Point, Rect } from "../../domain/geometry";
import { ViewModelParams } from "../types";
import { NodesSelectionMode, selectNodes } from "../../domain/selection";
import { switchToIdle } from "../variants/idle/switcher";
import { IdleViewState } from "../variants/idle/view-state";
import { switchToSelectionWindow } from "../variants/selection-window/switcher";
import { SelectionWindowViewState } from "../variants/selection-window/view-state";
import { switchToSelection } from "../variants/selection/switcher";
import { SelectionViewState } from "../variants/selection/view-state";

const SELECTION_WINDOW_MIN_DIFF = 20;

// FIXME: remove waiting for selection window distance overcome
const defineSelectedIds = (viewState: IdleViewState | SelectionViewState, selectionMode: NodesSelectionMode) => {
    if (viewState.type === "idle") {
        return undefined;
    }

    return selectionMode === "add" ? viewState.selectedIds : undefined;
};

export function useSelectionWindow({ nodesModel, canvasRect, setViewState }: ViewModelParams) {
    const [startPoint, setStartPoint] = useState<Point>();
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

    const onWindowMouseMove = (
        viewState: IdleViewState | SelectionViewState | SelectionWindowViewState,
        e: MouseEvent
    ) => {
        const start = viewState.type === "selection-window" ? viewState.startPoint : startPoint;

        if (!start) {
            return;
        }

        const currentPoint = Geometry.recalculatePosition({ x: e.clientX, y: e.clientY }, canvasRect);

        if (Geometry.pointsDistance(start, currentPoint) > SELECTION_WINDOW_MIN_DIFF) {
            if (viewState.type === "idle" || viewState.type === "selection") {
                const selectionMode = e.shiftKey || e.ctrlKey ? "add" : "replace";

                setViewState(
                    switchToSelectionWindow({
                        startPoint: start,
                        selectionMode: selectionMode,
                        selectedIds: defineSelectedIds(viewState, selectionMode)
                    })
                );
                reset();
                return;
            } else {
                setSelectionWindowRect(Geometry.rectFromPoints(start, currentPoint));
            }
        }
    };

    const onWindowMouseUp = (viewState: SelectionWindowViewState) => {
        const selection = selectNodes(selectedNodesIds, viewState.selectionMode, viewState.selectedIds);

        if (selection.size === 0) {
            setViewState(switchToIdle());
        } else {
            setViewState(switchToSelection({ selectedIds: selection, skipNextClick: true }));
        }
    };

    const reset = () => {
        setStartPoint(undefined);
        setSelectionWindowRect(undefined);
    };

    return {
        rect: selectionWindowRect,
        selectedNodesIds: new Set(selectedNodesIds),
        onOverlayMouseDown,
        onWindowMouseMove,
        onWindowMouseUp,
        reset
    };
}
