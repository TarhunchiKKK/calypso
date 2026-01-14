import { withNodeId } from "@/features/board-editor/core";
import type { ViewModel, ViewModelParams } from "../../types";
import { switchToIdle } from "../idle/switcher";
import { switchToSelection } from "../selection/switcher";
import { EditingNodesMapper } from "./nodes-mapping.lib";
import type { EditingViewState } from "./view-state";

export function useEditingViewModel({ nodesModel, setViewState }: ViewModelParams) {
    return (viewState: EditingViewState): ViewModel => {
        const handleClick = withNodeId(nodeId => {
            setViewState(switchToSelection({ selectedIds: new Set([nodeId]), skipNextClick: true }));
        });

        return {
            nodes: EditingNodesMapper.from(nodesModel.nodes)
                .map(viewState, nodesModel.service.updateOne, handleClick)
                .get(),
            overlay: {
                onClick: () => setViewState(switchToIdle())
            }
        };
    };
}
