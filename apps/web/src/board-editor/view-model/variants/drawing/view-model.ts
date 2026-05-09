import { DefaultNodesMapper } from "@/board-editor/core";
import type { DecoratableViewModel } from "../../decorators";
import type { ViewModelParams } from "../../types";

export function useDrawingViewModel(params: ViewModelParams) {
    return (): DecoratableViewModel => {
        return {
            nodes: DefaultNodesMapper.create().setNodes(params.nodesModel.nodes).map()
        };
    };
}
