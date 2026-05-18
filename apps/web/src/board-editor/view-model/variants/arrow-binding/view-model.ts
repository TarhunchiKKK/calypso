import type { ViewModelHook } from "../../types";
import { ArrowBindingNodesMapper } from "./lib/nodes-mapper";
import { useArrowBinding } from "./lib/use-arrow-binding.hook";
import { useBindingNode } from "./lib/use-binding-node.hook";
import type { ArrowBindingViewState } from "./view-state";

export const useArrowBindingViewModel: ViewModelHook<ArrowBindingViewState> = params => {
    const arrowBinding = useArrowBinding(params);

    const bindingNode = useBindingNode(params);

    return viewState => {
        return {
            nodes: ArrowBindingNodesMapper.create()
                .setNodes(params.nodesModel.nodes)
                .setArrow(arrowBinding.arrow)
                .setBindingNodeId(bindingNode.nodeId)
                .setBindingHandlers({
                    onMouseEnter: bindingNode.onMouseEnter,
                    onMouseLeave: bindingNode.onMouseLeave,
                    onMouseUp: point => bindingNode.onMouseUp(viewState, point)
                })
                .map(),
            window: {
                onMouseMove: arrowBinding.onMouseMove.bind(null, viewState)
                // onMouseUp: arrowBinding.onMouseUp.bind(null, viewState)
            }
        };
    };
};
