import type { OnlyIdDto } from "@api/common";
import { createDeduplicationHeaders } from "deduplication";

export const BoardsBrokerContracts = {
    nodesChanged: {
        pattern: "boards.nodes.changed",
        get: (dto: OnlyIdDto) => [BoardsBrokerContracts.nodesChanged.pattern, dto, createDeduplicationHeaders()] as const
    },
    boardRemoved: {
        pattern: "boards.board.removed",
        get: (dto: OnlyIdDto) => [BoardsBrokerContracts.boardRemoved.pattern, dto, createDeduplicationHeaders()] as const
    }
};
