import { useState } from "react";
import { Geometry, type Offset } from "@/features/board-editor/core";
import type { ViewModelParams } from "../../types";
import { switchToSelection } from "../selection/switcher";
import { DraggingNodesMapper } from "./nodes-mapping.lib";
import type { DraggingViewState } from "./view-state";

export function useDragging({ nodesModel, layoutDimensionsModel, setViewState }: ViewModelParams) {
    const [offset, setOffset] = useState<Offset>();

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

    return { offset, onWindowMouseMove, onWindowMouseUp };
}
