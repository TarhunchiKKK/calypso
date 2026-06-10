import type { OnlyIdDto } from "@api/common";
import { BoardsBrokerContracts } from "@contracts/broker";
import { Controller, Inject } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { BoardsService } from "../boards.service";

@Controller()
export class BoardsRmqController {
    public constructor(@Inject(BoardsService) private readonly boardsService: BoardsService) {}

    @EventPattern(BoardsBrokerContracts.nodesChanged.pattern)
    public async handleNodesChanged(@Payload() payload: OnlyIdDto) {
        await this.boardsService.changeBoardUpdateDate(payload.id);
    }

    @EventPattern(BoardsBrokerContracts.boardRemoved.pattern)
    public async handleBoardRemoved(@Payload() payload: OnlyIdDto) {
        await this.boardsService.removeBoardAccessRights(payload.id);
    }
}
