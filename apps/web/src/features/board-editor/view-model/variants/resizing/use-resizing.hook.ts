import { useState } from "react";
import { Geometry, type Rect } from "@/features/board-editor/core";
import { NodeDecoratorsFactory } from "@/features/board-editor/nodes";
import type { ViewModelParams } from "../../types";
import { switchToSelection } from "../selection/switcher";
import type { ResizingViewState } from "./view-state";

export function useResizing({ nodesModel, layoutDimensionsModel, setViewState }: ViewModelParams) {
    const [newSize, setNewSize] = useState<Rect>();

    const getResizingNode = (nodeId: string) => {
        const node = nodesModel.nodes.find(node => node.id === nodeId);

        if (!node) {
            throw Error("Node to resize not found");
        }

        return node;
    };

    const onMouseMove = (viewState: ResizingViewState, e: MouseEvent) => {
        const node = getResizingNode(viewState.nodeId);

        const currentPoint = Geometry.applyLayoutDimensions({ x: e.clientX, y: e.clientY }, layoutDimensionsModel);

        setNewSize(Geometry.applyResizing(NodeDecoratorsFactory.wrap(node).rect, currentPoint, viewState.direction));
    };

    const onMouseUp = (viewState: ResizingViewState) => {
        const node = getResizingNode(viewState.nodeId);

        if (newSize) {
            nodesModel.service.updateOne(NodeDecoratorsFactory.resizable(NodeDecoratorsFactory.wrap(node), newSize).data);
        }

        setViewState(switchToSelection({ selectedIds: new Set(viewState.nodeId), skipNextClick: true }));

        setNewSize(undefined);
    };

    return {
        newSize,
        onMouseMove,
        onMouseUp
    };
}
