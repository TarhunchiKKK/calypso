import type React from "react";
import type { NodesSelectionMode } from "@/board-editor/modules/selection";
import { Geometry } from "@/shared/lib/geometry";
import type { ViewModelParams } from "../../types";
import type { IdleViewState } from "../idle/view-state";
import type { SelectionViewState } from "../selection/view-state";
import type { SelectionWindowViewState } from "./view-state";
import type { Id, Point } from "@repo/common";

type Params = {
    selectedIds: Set<Id>;

    startPoint: Point;

    selectionMode: NodesSelectionMode;
};

export function switchToSelectionWindow({ selectedIds, startPoint, selectionMode }: Params): SelectionWindowViewState {
    return {
        type: "selection-window",
        startPoint: startPoint,
        selectedIds: selectionMode === "replace" ? new Set() : selectedIds,
        selectionMode: selectionMode
    };
}

export function useSwitchToSelectionWindow({ layoutDimensionsModel, setViewState }: ViewModelParams) {
    const onOverlayMouseDown = (viewState: IdleViewState | SelectionViewState, e: React.MouseEvent) => {
        if (layoutDimensionsModel.layoutOffset.isShifting(e)) {
            return;
        }

        const currentPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

        const selectionMode = e.shiftKey || e.ctrlKey ? "add" : "replace";

        setViewState(
            switchToSelectionWindow({
                startPoint: currentPoint,
                selectedIds: viewState.type === "selection" ? viewState.selectedIds : new Set(),
                selectionMode: selectionMode
            })
        );
    };

    return {
        onOverlayMouseDown
    };
}
