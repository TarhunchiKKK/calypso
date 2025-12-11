import React, { useState } from "react";
import { Geometry, Point, Rect } from "../../domain/geometry";
import { ViewModelParams } from "../types";
import { SelectionViewState, switchToSelection } from "../variants/selection";
import { IdleViewState, switchToIdle } from "../variants/idle";
import { SelectionWindowViewState, switchToSelectionWindow } from "../variants/selection-window";
import { joinSets } from "@/shared/lib/javascript";

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
                setViewState(
                    switchToSelectionWindow({
                        startPoint: start,
                        selectedIds: viewState.type === "selection" ? viewState.selectedIds : new Set()
                    })
                );
                reset();
                return;
            }

            setSelectionWindowRect(Geometry.rectFromPoints(start, currentPoint));
        }
    };

    const onWindowMouseUp = (viewState: SelectionWindowViewState) => {
        if (viewState.selectedIds.size > 0 && selectedNodesIds.length > 0) {
            setViewState(
                switchToSelection({
                    selectedIds: joinSets(viewState.selectedIds, new Set(selectedNodesIds)),
                    skipNextClick: true
                })
            );
        } else if (viewState.selectedIds.size > 0) {
            setViewState(switchToSelection({ selectedIds: viewState.selectedIds, skipNextClick: true }));
        } else if (selectedNodesIds.length > 0) {
            setViewState(switchToSelection({ selectedIds: new Set(selectedNodesIds), skipNextClick: true }));
        } else {
            setViewState(switchToIdle());
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
