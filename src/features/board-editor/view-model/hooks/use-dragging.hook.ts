import type React from "react";
import { useState } from "react";
import { Geometry, type Offset } from "../../core";
import type { ViewModelParams } from "../types";
import { DraggingNodesMapper } from "../variants/dragging/nodes-mapping.lib";
import { switchToDragging } from "../variants/dragging/switcher";
import type { DraggingViewState } from "../variants/dragging/view-state";
import { switchToSelection } from "../variants/selection/switcher";

export function useDragging({ nodesModel, layoutDimensionsModel, setViewState }: ViewModelParams) {
    const [offset, setOffset] = useState<Offset>();

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

    const onWindowMouseMove = (viewState: DraggingViewState, e: MouseEvent) => {
        const currentPoint = Geometry.applyLayoutDimensions({ x: e.clientX, y: e.clientY }, layoutDimensionsModel);

        setOffset(Geometry.calculateOffset(viewState.startPoint, currentPoint));
    };

    const onWindowMouseUp = (viewState: DraggingViewState) => {
        nodesModel.service.replaceAll(DraggingNodesMapper.from(nodesModel.nodes).map(viewState, offset).unwrap());

        setViewState(
            switchToSelection({
                selectedIds: viewState.selectedIds,
                skipNextClick: true
            })
        );

        setOffset(undefined);
    };

    return { offset, onMouseDown, onWindowMouseMove, onWindowMouseUp };
}
