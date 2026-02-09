import type React from "react";
import { Geometry, type Point } from "@/features/board-editor/core";
import type { ViewModelParams } from "../../types";
import type { DraggingViewState } from "./view-state";

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

        const currentPoint = Geometry.applyLayoutDimensions({ x: e.clientX, y: e.clientY }, layoutDimensionsModel);

        setViewState(
            switchToDragging({
                startPoint: currentPoint,
                selectedIds: selectedIds
            })
        );
    };

    return { onMouseDown };
}
