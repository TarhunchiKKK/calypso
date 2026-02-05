import { Controller, Inject } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { MessagePattern } from "@nestjs/microservices";
import { BOARD_REMOVED_MESSAGE_PATTERN } from "../boards/constants/rmq.constants";
import { RemoveNodesByBoardCommand } from "./handlers/remove-nodes-by-board.handler";

@Controller()
export class NodesRmqController {
    public constructor(@Inject(CommandBus) private readonly commandBus: CommandBus) {}

    @MessagePattern(BOARD_REMOVED_MESSAGE_PATTERN)
    public async handleBoardRemoved(boardId: string) {
        await this.commandBus.execute(new RemoveNodesByBoardCommand(boardId));
    }
}
