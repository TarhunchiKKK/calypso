import { ViewModelParams } from "../types";
import { Geometry, Rect } from "../../lib/geometry";
import { switchToResizing } from "../variants/resizing/switcher";
import { ResizingViewState } from "../variants/resizing/view-state";
import { switchToSelection } from "../variants/selection/switcher";
import { useState } from "react";
import { ResizingNodesMapper } from "../variants/resizing/nodes-mapper.lib";
import { ResizeDirection } from "../../modules/resizing";

export function useResizing({ nodesModel, setViewState, canvasRect }: ViewModelParams) {
    const [newSize, setNewSize] = useState<Rect>();

    const onMouseDown = (nodeId: string, direction: ResizeDirection) => {
        setViewState(switchToResizing({ nodeId, direction }));
    };

    const onMouseMove = (viewState: ResizingViewState, e: MouseEvent) => {
        const node = nodesModel.nodes.find(node => node.id === viewState.nodeId);

        if (!node) {
            return;
        }

        const currentPoint = Geometry.recalculatePosition({ x: e.clientX, y: e.clientY }, canvasRect);

        setNewSize(Geometry.applyResizing(node.rect(), currentPoint, viewState.direction));
    };

    const onMouseUp = (viewState: ResizingViewState) => {
        nodesModel.setNodes(
            ResizingNodesMapper.from(nodesModel.nodes, viewState).applyResizing(newSize).unselectCurrent().get()
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
