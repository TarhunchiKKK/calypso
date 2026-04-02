import type { Id } from "@repo/common";
import type { AnyNode } from "./compose.types";

export type CreateManyNodesRequest = {
    nodes: AnyNode[];

    boardId: Id;
};

export type UpdateManyNodesRequest = {
    nodes: AnyNode[];

    boardId: Id;
};

export type RemoveManyNodesRequest = {
    ids: Id[];

    boardId: Id;
};
