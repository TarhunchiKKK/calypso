import { useRef, useState } from "react";
import type { NodesModel } from "@/board-editor/nodes";
import type { ViewState } from "../types";

export type ViewStateGuard = (nodesModel: NodesModel, next: ViewState, prev: ViewState) => boolean;

/**
 * This hook stores middleware functions that will be performed between view state changes.
 *
 * @param nodesModel `NodesModel` instance.
 * @param initialState Initial view state data.
 * @returns Object containing current view state, update function and middlewares ref.
 */
export function useViewStateMediator(nodesModel: NodesModel, initialState: ViewState | (() => ViewState)) {
    const [viewState, setViewState] = useState<ViewState>(initialState);

    const guardsRef = useRef<Map<unknown, ViewStateGuard>>(new Map());

    const setWIthMiddleware = (next: ViewState) => {
        for (const guard of guardsRef.current.values()) {
            if (!guard(nodesModel, next, viewState)) {
                return;
            }
        }

        setViewState(next);
    };

    return {
        viewState,
        setViewState: setWIthMiddleware,
        guards: guardsRef.current
    };
}
