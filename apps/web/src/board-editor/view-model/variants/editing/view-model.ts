import { withNodeId } from "@/board-editor/core";
import type { DecoratableViewModel } from "../../decorators";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelParams } from "../../types";
import { switchToSelection } from "../selection/switcher";
import { EditingNodesMapper } from "./lib/nodes-mapper";
import { useNodeEditing } from "./lib/use-node-editing.hook";
import type { EditingViewState } from "./view-state";

export function useEditingViewModel(params: ViewModelParams) {
    const { nodesModel, setViewState } = params;

    const nodesMediator = useMouseEventsMediator();
    const overlayMediator = useMouseEventsMediator();

    const editingHandlers = useNodeEditing(params);

    return (viewState: EditingViewState): DecoratableViewModel => {
        nodesMediator.setHandlers({
            left: {
                onClick: withNodeId(nodeId => {
                    setViewState(switchToSelection({ selectedIds: new Set([nodeId]) }));
                })
            }
        });

        overlayMediator.setHandlers({
            left: {
                onClick: editingHandlers.end
            }
        });

        return {
            nodes: EditingNodesMapper.create()
                .setNodes(nodesModel.nodes)
                .setHandlers(nodesMediator.handlers)
                .setSelectedNodeId(viewState.selectedNodeId)
                .setEditingHandlers(editingHandlers)
                .map(),
            overlay: overlayMediator.handlers
        };
    };
}
