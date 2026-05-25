import { useEffect } from "react";
import { useArrowResolutionMiddleware } from "@/board-editor/modules/arrows-resolution";
import type { NodesModel } from "@/board-editor/nodes";

const ARROW_RESOLUTION_MIDDLEWARE_KEY = Symbol();

export function useSetupNodesServiceMiddleware(nodesModel: NodesModel) {
    const arrowResolutionMiddleware = useArrowResolutionMiddleware(nodesModel.nodes);

    useEffect(() => {
        nodesModel.service.middleware.set(ARROW_RESOLUTION_MIDDLEWARE_KEY, arrowResolutionMiddleware);
    }, [nodesModel.service.middleware.set, arrowResolutionMiddleware]);
}
