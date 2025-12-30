import React, { useState } from "react";
import { Geometry, Offset } from "../../lib/geometry";
import { ViewModelParams } from "../types";
import { switchToDragging } from "../variants/dragging/switcher";
import { DraggingViewState } from "../variants/dragging/view-state";
import { switchToSelection } from "../variants/selection/switcher";
import { DraggingNodesMapper } from "../variants/dragging/nodes-mapper.lib";

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
        nodesModel.setNodes(DraggingNodesMapper.from(nodesModel.nodes, viewState).applyOffset(offset).get());

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
