import type { Id } from "@repo/common";
import type React from "react";
import { Geometry } from "@/shared/lib/geometry";
import type { ViewModelParams } from "../../types";
import type { IdleViewState } from "../idle/view-state";
import type { SelectionViewState } from "../selection/view-state";

export function useSwitchToSelectionWindow({ layoutDimensionsModel, setViewState }: ViewModelParams) {
    const onOverlayMouseDown = (viewState: IdleViewState | SelectionViewState, e: React.MouseEvent) => {
        if (layoutDimensionsModel.layoutOffset.isShifting(e)) {
            return;
        }

        const currentPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

        const selectionMode = e.shiftKey || e.ctrlKey ? "add" : "replace";

        const viewStateSelectedIds = viewState.type === "selection" ? viewState.selectedIds : new Set<Id>();

        setViewState({
            type: "selection-window",
            startPoint: currentPoint,
            selectionMode: selectionMode,
            selectedIds: selectionMode === "replace" ? new Set() : viewStateSelectedIds
        });
    };

    return {
        onOverlayMouseDown
    };
}
