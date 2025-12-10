import { ViewModelParams } from "../types";
import { ResizingViewState, switchToResizing } from "../variants/resizing";
import { switchToSelection } from "../variants/selection";
import { ResizeDirection } from "../../domain/dom";
import { Geometry } from "../../domain/geometry";

export function useResizing({ nodesModel, setViewState }: ViewModelParams) {
    const onMouseDown = (nodeId: string, direction: ResizeDirection) => {
        setViewState(switchToResizing({ nodeId, direction }));
    };

    const onMouseMove = (viewState: ResizingViewState, e: MouseEvent) => {
        const node = nodesModel.nodes.find(node => node.id === viewState.nodeId);

        if (!node) {
            return;
        }

        const currentPoint = { x: e.clientX, y: e.clientY };

        const newSizes = Geometry.applyResizing(node.rect(), currentPoint, viewState.direction);

        nodesModel.setNodes(
            nodesModel.nodes.map(node =>
                node.id === viewState.nodeId ? node.clone().select(true).resize(newSizes) : node
            )
        );
    };

    const onMouseUp = (viewState: ResizingViewState) => {
        setViewState(switchToSelection({ selectedIds: new Set(viewState.nodeId), skipNextClick: true }));
    };

    return {
        onMouseDown,
        onMouseMove,
        onMouseUp
    };
}
