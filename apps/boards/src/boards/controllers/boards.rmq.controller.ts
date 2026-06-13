import { type OnlyIdDto, OnlyIdDtoZodSchema } from "@api/common";
import { BoardsBrokerContracts, BrokerValidation, DeduplicateMessage, DeduplicationTtl } from "@contracts/broker";
import { Controller, Inject } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { BoardsService } from "../boards.service";
import { BOARD_REMOVED_DEDUPLICATION_TTL, NODES_CHANGED_DEDUPLICATION_TTL } from "../lib/broker.constants";

@Controller()
@DeduplicateMessage()
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
