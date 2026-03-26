import { Controller, Inject } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { BrokerAcknowledgement, BrokerRoutingKeys } from "@repo/api";
import type { Id } from "@repo/common";
// biome-ignore lint/style/useImportType: Class import is needed for validation.
// biome-ignore lint/style/useImportType: Class import is needed for validation.
import { NodesService } from "../nodes.service";

@Controller()
export class NodesRmqController {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @MessagePattern(BrokerRoutingKeys.boards.events.boardRemoved)
    @BrokerAcknowledgement({ requeue: true, loggerContext: NodesRmqController.name })
    public async handleBoardRemoved(@Payload() boardId: Id) {
        await this.nodesService.removeNodesByBoard(boardId);
    }
}
