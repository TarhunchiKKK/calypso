import { type OnlyIdDto, OnlyIdDtoZodSchema } from "@api/common";
import { BoardsBrokerContracts, BrokerValidation, DeduplicateMessage, DeduplicationTtl } from "@contracts/broker";
import { Controller, Inject } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { BOARD_REMOVED_DEDUPLICATION_TTL } from "../lib/broker.constants";
import { NodesService } from "../nodes.service";

@Controller()
@DeduplicateMessage()
export class NodesRmqController {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @EventPattern(BoardsBrokerContracts.boardRemoved.pattern)
    @DeduplicationTtl(BOARD_REMOVED_DEDUPLICATION_TTL)
    // @BrokerAcknowledgement({ requeue: true, loggerContext: NodesRmqController.name })
    public async handleBoardRemoved(@BrokerValidation(OnlyIdDtoZodSchema) payload: OnlyIdDto) {
        await this.nodesService.removeNodesByBoard(payload.id);
    }
}
