import { ViewModelParams } from "../types";
import { switchToResizing } from "../variants/resizing/switcher";
import { ResizingViewState } from "../variants/resizing/view-state";
import { switchToSelection } from "../variants/selection/switcher";
import { useState } from "react";
import { ResizingNodesMapper } from "../variants/resizing/nodes-mapping.lib";
import { ResizeDirection } from "../../modules/resizing";
import { NodesFactory } from "../../nodes";
import { Geometry, Rect } from "../../core";

export function useResizing({ nodesModel, layoutDimensionsModel, setViewState }: ViewModelParams) {
    const [newSize, setNewSize] = useState<Rect>();

    const onMouseDown = (nodeId: string, direction: ResizeDirection) => {
        setViewState(switchToResizing({ nodeId, direction }));
    };

    const onMouseMove = (viewState: ResizingViewState, e: MouseEvent) => {
        const node = nodesModel.nodes.find(node => node.id === viewState.nodeId);

        if (!node) {
            return;
        }

        const currentPoint = Geometry.applyLayoutDimensions({ x: e.clientX, y: e.clientY }, layoutDimensionsModel);

        setNewSize(Geometry.applyResizing(NodesFactory.wrap(node).rect(), currentPoint, viewState.direction));
    };

    const onMouseUp = (viewState: ResizingViewState) => {
        nodesModel.service.replaceAl(
            ResizingNodesMapper.from(nodesModel.nodes, viewState).applyResizing(newSize).unselectCurrent().unwrap()
        );

        setViewState(switchToSelection({ selectedIds: new Set(viewState.nodeId), skipNextClick: true }));

        setNewSize(undefined);
    };

    return {
        newSize,
        onMouseDown,
        onMouseMove,
        onMouseUp
    };
}
