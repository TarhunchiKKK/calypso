import { NodeImpl } from "../../nodes/variants/base";
import { ViewModelParams } from "../types";
import { ResizingViewState, switchToResizing } from "../variants/resizing";
import { switchToSelection } from "../variants/selection";

export function useResizing({ nodesModel, setViewState }: ViewModelParams) {
    const onResizeStart = (nodeId: string) => {
        setViewState(switchToResizing(nodeId));
    };

    const getOnResizingEnd = (viewState: ResizingViewState) => {
        return (node: NodeImpl) => {
            console.log("call");
            switchToSelection({ selectedIds: new Set(viewState.nodeId) });
            nodesModel.updateOne(node);
        };
    };

    return {
        onResizeStart,
        getOnResizingEnd
    };
}
