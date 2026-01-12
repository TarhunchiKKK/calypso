import { ViewModelParams } from "../types";
import { switchToResizing } from "../variants/resizing/switcher";
import { ResizingViewState } from "../variants/resizing/view-state";
import { switchToSelection } from "../variants/selection/switcher";
import { useState } from "react";
import { ResizeDirection } from "../../modules/resizing";
import { NodesFactory } from "../../nodes";
import { Geometry, Rect } from "../../core";

export function useResizing({ nodesModel, layoutDimensionsModel, setViewState }: ViewModelParams) {
    const [newSize, setNewSize] = useState<Rect>();

    const getResizingNode = (nodeId: string) => {
        const node = nodesModel.nodes.find(node => node.id === nodeId);

        if (!node) {
            throw Error("Node to resize not found");
        }

        return node;
    };

    const onMouseDown = (nodeId: string, direction: ResizeDirection) => {
        setViewState(switchToResizing({ nodeId, direction }));
    };

    const onMouseMove = (viewState: ResizingViewState, e: MouseEvent) => {
        const node = getResizingNode(viewState.nodeId);

        const currentPoint = Geometry.applyLayoutDimensions({ x: e.clientX, y: e.clientY }, layoutDimensionsModel);

        setNewSize(Geometry.applyResizing(NodesFactory.wrap(node).rect(), currentPoint, viewState.direction));
    };

    const onMouseUp = (viewState: ResizingViewState) => {
        const node = getResizingNode(viewState.nodeId);

        nodesModel.service.updateOne(NodesFactory.wrap(node).clone(newSize).data);

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
