import { useRef, useState } from "react";
import type { NodesModel } from "@/board-editor/nodes";
import { EMPTY_IDS_GUARD_KEY, EmptyIdsGuard } from "../middleware/empty-ids.guard";
import { LOCKED_NODES_GUARD_KEY, LockedNodesGuard } from "../middleware/locked-node.guard";
import type { ViewState } from "../types";

export type ViewStateGuard = (nodesModel: NodesModel, next: ViewState, prev: ViewState) => boolean;

const DefaultGuards = new Map([
    [EMPTY_IDS_GUARD_KEY, EmptyIdsGuard],
    [LOCKED_NODES_GUARD_KEY, LockedNodesGuard]
]);

/**
 * This hook stores middleware functions that will be performed between view state changes.
 *
 * @param nodesModel `NodesModel` instance.
 * @param initialState Initial view state data.
 * @returns Object containing current view state, update function and middlewares ref.
 */
export function useViewStateMediator(nodesModel: NodesModel, initialState: ViewState | (() => ViewState)) {
    const [viewState, setViewState] = useState<ViewState>(initialState);

    const guardsRef = useRef<Map<unknown, ViewStateGuard>>(DefaultGuards);

    const setWithMiddleware = (next: ViewState) => {
        for (const guard of guardsRef.current.values()) {
            if (!guard(nodesModel, next, viewState)) {
                return;
            }
        }

        setViewState(next);
    };

    return {
        viewState,
        setViewState: setWithMiddleware,
        guards: guardsRef.current
    };
}
