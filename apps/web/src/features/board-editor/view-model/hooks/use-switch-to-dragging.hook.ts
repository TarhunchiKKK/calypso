import type React from "react";
import { Geometry } from "../../core";
import type { ViewModelParams } from "../types";
import { switchToDragging } from "../variants/dragging/switcher";

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
