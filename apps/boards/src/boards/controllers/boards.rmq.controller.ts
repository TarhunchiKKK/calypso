import { Controller, Inject } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { BrokerAcknowledgement, BrokerRoutingKeys } from "@repo/api";
import type { Id } from "@repo/common";
import { BoardsService } from "../boards.service";

@Controller()
export class BoardsRmqController {
    public constructor(@Inject(BoardsService) private readonly boardsService: BoardsService) {}

    @EventPattern(BrokerRoutingKeys.boards.nodesChanged)
    @BrokerAcknowledgement({ requeue: true, loggerContext: BoardsRmqController.name })
    public async nodesChanged(@Payload() boardId: Id) {
        await this.boardsService.changeBoardUpdateDate(boardId);
    }

    @EventPattern(BrokerRoutingKeys.boards.boardRemoved)
    @BrokerAcknowledgement({ requeue: true, loggerContext: BoardsRmqController.name })
    public async boardRemoved(@Payload() boardId: Id) {
        await this.boardsService.removeBoardAccessRights(boardId);
    }
}
