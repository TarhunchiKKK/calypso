import { Controller, Inject } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { BrokerRoutingKeys } from "@repo/api";
import type { Id } from "@repo/common";
import { NodesService } from "../nodes.service";

@Controller()
export class NodesRmqController {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @EventPattern(BrokerRoutingKeys.boards.boardRemoved)
    // @BrokerAcknowledgement({ requeue: true, loggerContext: NodesRmqController.name })
    public async handleBoardRemoved(@Payload() boardId: Id) {
        await this.nodesService.removeNodesByBoard(boardId);
    }
}
