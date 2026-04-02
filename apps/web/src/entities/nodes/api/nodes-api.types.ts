import type { NodeBase } from "@repo/boards-common";
import type { Id } from "@repo/common";

export type NodesApi = {
    createMany: (nodes: NodeBase[]) => void | Promise<void>;

    findAll: () => NodeBase[] | Promise<NodeBase>;

    updateMany: (nodes: NodeBase[]) => void | Promise<void>;

    removeMany: (ids: Id[]) => void | Promise<void>;
};
