import type { NodeBase } from "@repo/boards-common";
import { useRef, useState } from "react";
import type { ViewState } from "../types";

export type ViewStateGuard = (nodes: NodeBase[], next: ViewState, prev: ViewState) => boolean;

export function useViewStateMediator(nodes: NodeBase[], initialState: ViewState | (() => ViewState)) {
    const [viewState, setViewState] = useState<ViewState>(initialState);

    const guardsRef = useRef<Map<unknown, ViewStateGuard>>(new Map());

    const setWIthMiddleware = (next: ViewState) => {
        for (const guard of guardsRef.current.values()) {
            if (!guard(nodes, next, viewState)) {
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
