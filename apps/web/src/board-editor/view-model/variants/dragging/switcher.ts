import type React from "react";
import { Geometry } from "@/shared/lib/geometry";
import type { ViewModelParams } from "../../types";
import type { DraggingViewState } from "./view-state";
import type { Id, Point } from "@repo/common";

type Params = {
    startPoint: Point;

    selectedIds?: Set<Id>;
};

export function switchToDragging({ startPoint, selectedIds }: Params): DraggingViewState {
    return {
        type: "dragging",
        startPoint: startPoint,
        selectedIds: selectedIds ?? new Set()
    };
}

export function useSwitchToDragging({ layoutDimensionsModel, setViewState }: ViewModelParams) {
    const onMouseDown = (selectedIds: Set<Id>, e: React.MouseEvent) => {
        if (layoutDimensionsModel.layoutOffset.isShifting(e)) {
            return;
        }

        const currentPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

        setViewState(
            switchToDragging({
                startPoint: currentPoint,
                selectedIds: selectedIds
            })
        );
    };

    return { onMouseDown };
}
