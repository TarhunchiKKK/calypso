import type { Board } from "@repo/boards-common";
import type { Id } from "@repo/common";

export type DuplicateBoardDto = {
    id: Id;

    creator: Board["creator"];
};
