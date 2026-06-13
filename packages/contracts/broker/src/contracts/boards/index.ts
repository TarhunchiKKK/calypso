import type { OnlyIdDto } from "@api/common";
import { withMessageId } from "deduplication";

export const BoardsBrokerContracts = {
    nodesChanged: {
        pattern: "boards.nodes.changed",
        get: (dto: OnlyIdDto) => [BoardsBrokerContracts.nodesChanged.pattern, withMessageId(dto)] as const
    },
    boardRemoved: {
        pattern: "boards.board.removed",
        get: (dto: OnlyIdDto) => [BoardsBrokerContracts.boardRemoved.pattern, withMessageId(dto)] as const
    }
};
