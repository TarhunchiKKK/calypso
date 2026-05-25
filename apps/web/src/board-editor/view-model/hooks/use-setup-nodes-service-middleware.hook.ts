import { useEffect } from "react";
import { ARROW_RESOLUTION_MIDDLEWARE_KEY, useArrowResolutionMiddleware } from "@/board-editor/modules/arrows-resolution";
import type { NodesModel } from "@/board-editor/nodes";

export function useSetupNodesServiceMiddleware(nodesModel: NodesModel) {
    const arrowResolutionMiddleware = useArrowResolutionMiddleware(nodesModel.nodes);

    useEffect(() => {
        nodesModel.service.middleware.set(ARROW_RESOLUTION_MIDDLEWARE_KEY, arrowResolutionMiddleware);
    }, [nodesModel.service.middleware.set, arrowResolutionMiddleware]);
}
