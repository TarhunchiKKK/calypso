import { withNodeId } from "@/board-editor/core";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelHook } from "../../types";
import { switchToSelection } from "../selection/switcher";
import { EditingNodesMapper } from "./lib/nodes-mapper";
import { useNodeEditing } from "./lib/use-node-editing.hook";
import type { EditingViewState } from "./view-state";

export const useEditingViewModel: ViewModelHook<EditingViewState> = (params) => {
    const { nodesModel, setViewState } = params;

    const nodesMediator = useMouseEventsMediator();
    const overlayMediator = useMouseEventsMediator();

    const editingHandlers = useNodeEditing(params);

    return (viewState) => {
        nodesMediator.setHandlers({
            left: {
                onClick: withNodeId((nodeId) => {
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
};
