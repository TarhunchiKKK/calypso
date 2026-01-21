import type React from "react";
import { useState } from "react";
import { Geometry, type Rect } from "../../core";
import { selectNodes } from "../../modules/selection";
import { NodeDecoratorsFactory } from "../../nodes";
import type { ViewModelParams } from "../types";
import { switchToIdle } from "../variants/idle/switcher";
import type { IdleViewState } from "../variants/idle/view-state";
import { switchToSelection } from "../variants/selection/switcher";
import type { SelectionViewState } from "../variants/selection/view-state";
import { switchToSelectionWindow } from "../variants/selection-window/switcher";
import type { SelectionWindowViewState } from "../variants/selection-window/view-state";

export function useSelectionWindow({ nodesModel, layoutDimensionsModel, setViewState }: ViewModelParams) {
    const [selectionWindowRect, setSelectionWindowRect] = useState<Rect>();

    let selectedNodesIds: string[] = [];
    if (selectionWindowRect) {
        selectedNodesIds = nodesModel.nodes
            .map(node => NodeDecoratorsFactory.wrap(node))
            .filter(node => Geometry.rectsIntersecting(selectionWindowRect, node.rect))
            .map(node => node.id);
    }

    const onOverlayMouseDown = (viewState: IdleViewState | SelectionViewState, e: React.MouseEvent) => {
        if (layoutDimensionsModel.layoutOffset.isShifting(e)) {
            return;
        }

        const currentPoint = Geometry.applyLayoutDimensions({ x: e.clientX, y: e.clientY }, layoutDimensionsModel);

        const selectionMode = e.shiftKey || e.ctrlKey ? "add" : "replace";

        setViewState(
            switchToSelectionWindow({
                startPoint: currentPoint,
                selectedIds: viewState.type === "selection" ? viewState.selectedIds : new Set(),
                selectionMode: selectionMode
            })
        );

        setSelectionWindowRect(undefined);
    };

    const onWindowMouseMove = (viewState: SelectionWindowViewState, e: MouseEvent) => {
        const currentPoint = Geometry.applyLayoutDimensions({ x: e.clientX, y: e.clientY }, layoutDimensionsModel);

        setSelectionWindowRect(Geometry.rectFromPoints(viewState.startPoint, currentPoint));
    };

    const onWindowMouseUp = (viewState: SelectionWindowViewState) => {
        const selection = selectNodes(selectedNodesIds, viewState.selectionMode, viewState.selectedIds);

        if (selection.size === 0) {
            setViewState(switchToIdle());
        } else {
            setViewState(switchToSelection({ selectedIds: selection, skipNextClick: true }));
        }

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
