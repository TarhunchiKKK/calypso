import type { Id } from "../../shared/db.types";
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
