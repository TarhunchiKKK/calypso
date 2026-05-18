import type { Id } from "@repo/common";
import type React from "react";
import { Geometry } from "@/shared/lib/geometry";
import type { ViewModelParams } from "../../types";

export function useSwitchToDragging({ layoutDimensionsModel, setViewState }: ViewModelParams) {
    const onMouseDown = (nodeIds: Set<Id>, e: React.MouseEvent) => {
        if (layoutDimensionsModel.layoutOffset.isShifting(e)) {
            return;
        }

        const currentPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

        setViewState({
            type: "dragging",
            startPoint: currentPoint,
            nodeIds: nodeIds
        });
    };

    return { onMouseDown };
}
