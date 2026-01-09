import { ViewModel, ViewModelParams } from "../../types";
import { switchToIdle } from "../idle/switcher";
import { switchToSelection } from "../selection/switcher";
import { EditingViewState } from "./view-state";
import { EditingNodesMapper } from "./nodes-mapping.lib";
import { withNodeId } from "@/features/board-editor/core";

export function useEditingViewModel({ nodesModel, setViewState }: ViewModelParams) {
    return (viewState: EditingViewState): ViewModel => {
        const handleClick = withNodeId(nodeId => {
            setViewState(switchToSelection({ selectedIds: new Set([nodeId]), skipNextClick: true }));
        });

        return {
            nodes: EditingNodesMapper.from(nodesModel.nodes, viewState)
                .wrap()
                .applyHandlers(nodesModel.service.updateOne, handleClick)
                .get(),
            overlay: {
                onClick: () => setViewState(switchToIdle())
            }
        };
    };
}
