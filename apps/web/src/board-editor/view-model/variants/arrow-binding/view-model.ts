import type { ViewModelParams } from "../../types";
import type { DecoratableViewModel } from "../../types/view-model.types";
import { ArrowBindingNodesMapper } from "./lib/nodes-mapper";
import type { ArrowBindingViewState } from "./view-state";

export function useArrowBindingViewModel(params: ViewModelParams) {
    const { nodesModel } = params;

    return (viewState: ArrowBindingViewState): DecoratableViewModel => {
        return {
            nodes: ArrowBindingNodesMapper.from(nodesModel.nodes).map()
        };
    };
}
