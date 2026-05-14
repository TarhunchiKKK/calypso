import { Controller, Inject } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { BrokerRoutingKeys } from "@repo/api";
import type { Id } from "@repo/common";
import { BoardsService } from "../boards.service";

@Controller()
export class BoardsRmqController {
    public constructor(@Inject(BoardsService) private readonly boardsService: BoardsService) {}

    @EventPattern(BrokerRoutingKeys.boards.nodesChanged)
    public async handleNodesChanged(@Payload() boardId: Id) {
        await this.boardsService.changeBoardUpdateDate(boardId);
    }

    @EventPattern(BrokerRoutingKeys.boards.boardRemoved)
    public async handleBoardRemoved(@Payload() boardId: Id) {
        await this.boardsService.removeBoardAccessRights(boardId);
    }
}
