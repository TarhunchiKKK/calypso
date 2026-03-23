import { Controller, Inject } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { BrokerAcknowledgement, BrokerRoutingKeys } from "@repo/api";
import { BoardsService } from "../boards.service";

@Controller()
export class BoardsRmqController {
    public constructor(@Inject(BoardsService) private readonly boardsService: BoardsService) {}

    @EventPattern(BrokerRoutingKeys.boards.events.nodesChanged)
    @BrokerAcknowledgement({ requeue: true, loggerContext: BoardsRmqController.name })
    public async nodesChanged(@Payload() boardId: string) {
        await this.boardsService.changeBoardUpdateDate(boardId);
    }
}
