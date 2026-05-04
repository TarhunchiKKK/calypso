import { withNodeId } from "@/board-editor/core";
import type { DecoratableViewModel } from "../../decorators";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelParams } from "../../types";
import { switchToIdle } from "../idle/switcher";
import { switchToSelection } from "../selection/switcher";
import { EditingNodesMapper } from "./lib/nodes-mapper";
import { useNodeEditing } from "./lib/use-node-editing.hook";
import type { EditingViewState } from "./view-state";

export function useEditingViewModel({ nodesModel, setViewState }: ViewModelParams) {
    const nodesMediator = useMouseEventsMediator();
    const overlayMediator = useMouseEventsMediator();

    const editingHandlers = useNodeEditing(nodesModel);

    return (viewState: EditingViewState): DecoratableViewModel => {
        nodesMediator.setHandlers({
            left: {
                onClick: withNodeId(nodeId => {
                    setViewState(switchToSelection({ selectedIds: new Set([nodeId]), skipNextClick: true }));
                })
            }
        });

        overlayMediator.setHandlers({
            left: {
                onClick: () => {
                    editingHandlers.end();
                    setViewState(switchToIdle());
                }
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
