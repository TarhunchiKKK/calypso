import type { NodeBase } from "@lib/boards";
import type { Id } from "@lib/common";
import { useRef } from "react";

type Util = {
    findOne: (nodeID: Id) => NodeBase;
};

export type NodesServiceMapper = (nodes: NodeBase[], util: Util) => NodeBase[];

export function useNodesServiceMappers(defaultMappers: Map<string | symbol, NodesServiceMapper>) {
    const mappersRef = useRef<Map<string | symbol, NodesServiceMapper>>(defaultMappers);

    return {
        set: (key: string | symbol, mapper: NodesServiceMapper) => {
            mappersRef.current.set(key, mapper);
        },
        remove: (key: string | symbol) => {
            mappersRef.current.delete(key);
        },
        apply: (nodes: NodeBase[], util: Util) => {
            const mappers = Array.from(mappersRef.current.values());

            return mappers.reduce((resultNodes, mapper) => mapper(resultNodes, util), [...nodes]);
        }
    };
}
