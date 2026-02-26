import { MockNodes } from "@/dev";
import type { NodeBase } from "../types/node.types";
import type { NodesApi } from "./nodes-api.types";

// IMPLEMENTATION
export const NodesMongoApi: NodesApi = {
    createMany: (nodes: NodeBase[]): void | Promise<void> => {
        console.log(nodes);
    },

    findAll: (): NodeBase[] | Promise<NodeBase> => {
        return MockNodes;
    },

    updateMany: (nodes: NodeBase): void | Promise<void> => {
        console.log(nodes);
    },

    removeMany: (ids: string[]): void | Promise<void> => {
        console.log(ids);
    }
};
