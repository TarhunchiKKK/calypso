import type { ViewModelParams } from "../../types";
import type { DecoratableViewModel } from "../../types/view-model.types";
import { ArrowBindingNodesMapper } from "./lib/nodes-mapper";
import { useArrowBinding } from "./lib/use-arrow-binding.hook";
import { useBindingNode } from "./lib/use-binding-node.hook";
import type { ArrowBindingViewState } from "./view-state";

export function useArrowBindingViewModel(params: ViewModelParams) {
    const { nodesModel } = params;

    const arrowBinding = useArrowBinding(params);

    const bindingNode = useBindingNode(params);

    return (viewState: ArrowBindingViewState): DecoratableViewModel => {
        return {
            nodes: ArrowBindingNodesMapper.from(nodesModel.nodes)
                .setArrowId(viewState.arrowId)
                .setBindingNodeId(bindingNode.nodeId)
                .setBindingHandlers({
                    onMouseEnter: bindingNode.onMouseEnter,
                    onMouseLeave: bindingNode.onMouseLeave,
                    onMouseUp: point => bindingNode.onMouseUp(viewState, point)
                })
                .map(),
            window: {
                onMouseMove: arrowBinding.onMouseMove.bind(null, viewState),
                onMouseUp: arrowBinding.onMouseUp.bind(null, viewState)
            }
        };
    };
}
