import type { NodeBase } from "@repo/boards-common";
import type { Id } from "@repo/common";
import { useCallback, useRef } from "react";

export type NodesServiceMiddlewarePayload = { operation: "create" | "update"; nodes: NodeBase[] } | { operation: "remove"; nodes: Id[] };

export type NodesServiceMiddleware = (prev: NodeBase[], payload: NodesServiceMiddlewarePayload) => NodeBase[];

export function useNodesServiceMiddleware() {
    const middlewaresRef = useRef<Map<unknown, NodesServiceMiddleware>>(new Map());

    const set = useCallback((key: unknown, middleware: NodesServiceMiddleware) => {
        middlewaresRef.current.set(key, middleware);
    }, []);

    const remove = useCallback((middleware: NodesServiceMiddleware) => {
        middlewaresRef.current.delete(middleware);
    }, []);

    const apply = useCallback((nodes: NodeBase[], payload: NodesServiceMiddlewarePayload) => {
        const middlewares = Array.from(middlewaresRef.current.values());

        return middlewares.reduce((copy, middleware) => middleware(copy, payload), [...nodes]);
    }, []);

    return {
        set,
        remove,
        apply
    };
}
