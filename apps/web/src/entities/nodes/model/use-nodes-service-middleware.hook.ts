import type { NodeBase } from "@lib/boards";
import type { Id } from "@lib/common";
import { useCallback, useRef } from "react";

type Util = {
    findOne: (nodeId: Id) => NodeBase;
};

export type NodesServiceMiddlewarePayload = { operation: "create" | "update"; nodes: NodeBase[] } | { operation: "remove"; nodes: Id[] };

export type NodesServiceMiddleware = (prev: NodeBase[], payload: NodesServiceMiddlewarePayload, util: Util) => NodeBase[];

/**
 * This hook store middleware functions that will be executed before all "writing" operations performed by the nodes service.
 *
 * @returns Object containing middleware management methods and method for applying middleware functions
 */
export function useNodesServiceMiddleware() {
    const middlewaresRef = useRef<Map<unknown, NodesServiceMiddleware>>(new Map());

    const set = useCallback((key: unknown, middleware: NodesServiceMiddleware) => {
        middlewaresRef.current.set(key, middleware);
    }, []);

    const remove = useCallback((middleware: NodesServiceMiddleware) => {
        middlewaresRef.current.delete(middleware);
    }, []);

    const apply = useCallback((nodes: NodeBase[], payload: NodesServiceMiddlewarePayload, util: Util) => {
        const middlewares = Array.from(middlewaresRef.current.values());

        return middlewares.reduce((copy, middleware) => middleware(copy, payload, util), [...nodes]);
    }, []);

    return {
        set,
        remove,
        apply
    };
}
