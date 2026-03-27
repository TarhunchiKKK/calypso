import { MockNodes } from "@/dev";
import type { NodesApi } from "./nodes-api.types";

// IMPLEMENTATION
export const NodesMongoApi: NodesApi = {
    createMany: (nodes): void | Promise<void> => {
        console.log(nodes);
    },

    findAll: () => {
        return MockNodes;
    },

    updateMany: (nodes): void | Promise<void> => {
        console.log(nodes);
    },

    removeMany: (ids): void | Promise<void> => {
        console.log(ids);
    }
};
