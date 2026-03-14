import type { NodeBase } from "../types/node.types";

export type NodesApi = {
    createMany: (nodes: NodeBase[]) => void | Promise<void>;

    findAll: () => NodeBase[] | Promise<NodeBase>;

    updateMany: (nodes: NodeBase) => void | Promise<void>;

    removeMany: (ids: string[]) => void | Promise<void>;
};
