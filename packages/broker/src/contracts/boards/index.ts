import type { OnlyIdDto } from "@api/common";

export const BoardsBrokerContracts = {
    nodesChanged: {
        pattern: "boards.nodes.changed",
        payload: (dto: OnlyIdDto) => dto
    },
    boardRemoved: {
        pattern: "boards.board.removed",
        payload: (dto: OnlyIdDto) => dto
    }
};
