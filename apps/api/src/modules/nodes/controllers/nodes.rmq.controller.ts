import { BoardsBrokerContracts, BrokerController, BrokerValidation, DeduplicateMessages, DeduplicationTtl } from "@contracts/broker";
import { Inject } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { Logging } from "src/infra/logs/decorators/logging.decorator";
import { type OnlyIdDto, OnlyIdDtoZodSchema } from "src/shared/dto";
import { BOARD_REMOVED_DEDUPLICATION_TTL } from "../lib/broker.constants";
import { NodesService } from "../nodes.service";

@BrokerController()
@DeduplicateMessages()
@Logging("broker")
export class NodesRmqController {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @EventPattern(BoardsBrokerContracts.boardRemoved.pattern)
    @DeduplicationTtl(BOARD_REMOVED_DEDUPLICATION_TTL)
    // @BrokerAcknowledgement({ requeue: true, loggerContext: NodesRmqController.name })
    public async handleBoardRemoved(@BrokerValidation(OnlyIdDtoZodSchema) payload: OnlyIdDto) {
        await this.nodesService.removeNodesByBoard(payload.id);
    }
}
