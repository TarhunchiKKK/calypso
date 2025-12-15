import { ViewModel, ViewModelParams } from "../../types";
import { switchToIdle } from "../idle/switcher";
import { switchToSelection } from "../selection/switcher";
import { EditingViewState } from "./view-state";

export function useEditingViewModel({ nodesModel, setViewState }: ViewModelParams) {
    return (viewState: EditingViewState): ViewModel => {
        const handleSwitchToSelection = (nodeId: string) => {
            setViewState(switchToSelection({ selectedIds: new Set([nodeId]), skipNextClick: true }));
        };

        return {
            nodes: nodesModel.nodes.map(node =>
                viewState.selectedNodeId === node.id
                    ? node.clone().select().setEditing().setHandler("onEditingEnd", nodesModel.updateOne)
                    : node.setHandler("onClick", () => handleSwitchToSelection(node.id))
            ),
            overlay: {
                onClick: () => setViewState(switchToIdle())
            }
        };
    };
}
