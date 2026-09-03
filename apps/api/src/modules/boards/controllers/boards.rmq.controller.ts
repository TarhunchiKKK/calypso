import { type OnlyIdDto, OnlyIdDtoZodSchema } from "@api/common";
import { Logging } from "@api/logs";
import { BoardsBrokerContracts, BrokerController, BrokerValidation, DeduplicateMessages, DeduplicationTtl } from "@contracts/broker";
import { Inject } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { BoardsService } from "../boards.service";
import { BOARD_REMOVED_DEDUPLICATION_TTL, NODES_CHANGED_DEDUPLICATION_TTL } from "../lib/broker.constants";

@BrokerController()
@DeduplicateMessages()
@Logging("broker")
export class BoardsRmqController {
    public constructor(@Inject(BoardsService) private readonly boardsService: BoardsService) {}

    @EventPattern(BoardsBrokerContracts.nodesChanged.pattern)
    @DeduplicationTtl(NODES_CHANGED_DEDUPLICATION_TTL)
    public async handleNodesChanged(@BrokerValidation(OnlyIdDtoZodSchema) payload: OnlyIdDto) {
        await this.boardsService.changeBoardUpdateDate(payload.id);
    }

    @EventPattern(BoardsBrokerContracts.boardRemoved.pattern)
    @DeduplicationTtl(BOARD_REMOVED_DEDUPLICATION_TTL)
    public async handleBoardRemoved(@BrokerValidation(OnlyIdDtoZodSchema) payload: OnlyIdDto) {
        await this.boardsService.removeBoardAccessRights(payload.id);
    }
}
