import type { Id } from "@lib/common";
import { useEffect } from "react";
import { NodesApi } from "@/entities/nodes";

type Params = {
    boardId: Id;
};

export function useBoardEditorUnmount({ boardId }: Params) {
    const invalidateNodes = NodesApi.useInvalidateCache();

    useEffect(() => {
        return () => {
            invalidateNodes(boardId);
        };
    }, [boardId, invalidateNodes]);
}
