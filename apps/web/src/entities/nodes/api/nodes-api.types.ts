import type { Boards, Id } from "@repo/common";

export type NodesApi = {
    createMany: (nodes: Boards.NodeBase[]) => void | Promise<void>;

    findAll: () => Boards.NodeBase[] | Promise<Boards.NodeBase>;

    updateMany: (nodes: Boards.NodeBase[]) => void | Promise<void>;

    removeMany: (ids: Id[]) => void | Promise<void>;
};
