import type { Id } from "@lib/common";
import type React from "react";
import { Geometry } from "@/shared/lib/geometry";
import type { ViewModelParams } from "../../types";
import type { IdleViewState } from "../idle/view-state";
import type { SelectionViewState } from "../selection/view-state";

export function useSwitchToSelectionWindow({ layoutDimensionsModel, setViewState }: ViewModelParams) {
    const onOverlayMouseDown = (viewState: IdleViewState | SelectionViewState, e: React.MouseEvent) => {
        if (layoutDimensionsModel.handlers.isShifting(e)) {
            return;
        }

        const currentPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

        const selectionMode = e.shiftKey || e.ctrlKey ? "add" : "replace";

        const viewStateSelectedIds = viewState.type === "selection" ? viewState.nodeIds : new Set<Id>();

        setViewState({
            type: "selection-window",
            startPoint: currentPoint,
            mode: selectionMode,
            nodeIds: selectionMode === "replace" ? new Set() : viewStateSelectedIds
        });
    };

    return {
        onOverlayMouseDown
    };
}
