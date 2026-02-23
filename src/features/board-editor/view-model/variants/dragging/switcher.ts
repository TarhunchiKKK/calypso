import type React from "react";
import type { ViewModelParams } from "../../types";
import type { DraggingViewState } from "./view-state";
import type { Point } from "@/shared/lib/geometry";

type Params = {
    startPoint: Point;

    selectedIds?: Set<string>;
};

export function switchToDragging({ startPoint, selectedIds }: Params): DraggingViewState {
    return {
        type: "dragging",
        startPoint: startPoint,
        selectedIds: selectedIds ?? new Set()
    };
}

export function useSwitchToDragging({ layoutDimensionsModel, setViewState }: ViewModelParams) {
    const onMouseDown = (selectedIds: Set<string>, e: React.MouseEvent) => {
        if (layoutDimensionsModel.layoutOffset.isShifting(e)) {
            return;
        }

        const currentPoint = layoutDimensionsModel.applyForPoint({ x: e.clientX, y: e.clientY });

        setViewState(
            switchToDragging({
                startPoint: currentPoint,
                selectedIds: selectedIds
            })
        );
    };

    return { onMouseDown };
}
