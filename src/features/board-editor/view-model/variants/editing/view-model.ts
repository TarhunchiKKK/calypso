import { ViewModel, ViewModelParams } from "../../types";
import { switchToIdle } from "../idle/switcher";

export function useEditingViewModel({ nodesModel, setViewState }: ViewModelParams) {
    return (): ViewModel => {
        return {
            nodes: nodesModel.nodes,
            overlay: {
                onClick: () => setViewState(switchToIdle())
            }
        };
    };
}
