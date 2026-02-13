import { withNodeId } from "@/features/board-editor/core";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModel, ViewModelParams } from "../../types";
import { switchToIdle } from "../idle/switcher";
import { switchToSelection } from "../selection/switcher";
import { EditingNodesMapper } from "./nodes-mapping.lib";
import type { EditingViewState } from "./view-state";

export function useEditingViewModel({ nodesModel, setViewState }: ViewModelParams) {
    const nodesMediator = useMouseEventsMediator();
    const overlayMediator = useMouseEventsMediator();

    return (viewState: EditingViewState): ViewModel => {
        nodesMediator.setHandlers({
            left: {
                onClick: withNodeId(nodeId => {
                    setViewState(switchToSelection({ selectedIds: new Set([nodeId]), skipNextClick: true }));
                })
            }
        });

        overlayMediator.setHandlers({
            left: {
                onClick: () => setViewState(switchToIdle())
            }
        });

        return {
            nodes: EditingNodesMapper.from(nodesModel.nodes).map(viewState, nodesModel.service.updateOne, nodesMediator.handlers).get(),
            overlay: overlayMediator.handlers
        };
    };
}
