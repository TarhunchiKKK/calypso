import React, { useState } from "react";
import { Geometry, Offset } from "../../domain/geometry";
import { ViewModelParams } from "../types";
import { switchToDragging } from "../variants/dragging/switcher";
import { DraggingViewState } from "../variants/dragging/view-state";
import { switchToSelection } from "../variants/selection/switcher";
import { DraggingNodesMapper } from "../variants/dragging/helpers";

export function useDragging({ nodesModel, setViewState, canvasRect }: ViewModelParams) {
    const [offset, setOffset] = useState<Offset>();

    const onMouseDown = (selectedIds: Set<string>, e: React.MouseEvent) => {
        const currentPoint = Geometry.recalculatePosition({ x: e.clientX, y: e.clientY }, canvasRect);

        setViewState(
            switchToDragging({
                startPoint: currentPoint,
                selectedIds: selectedIds
            })
        );
    };

    const onWindowMouseMove = (viewState: DraggingViewState, e: MouseEvent) => {
        const currentPoint = Geometry.recalculatePosition({ x: e.clientX, y: e.clientY }, canvasRect);

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
