import { useRef, useState } from "react";
import type { NodesModel } from "@/board-editor/nodes";
import type { ViewState } from "../types";

export type ViewStateGuard = (nodesModel: NodesModel, next: ViewState, prev: ViewState) => boolean;

// DOCS
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
