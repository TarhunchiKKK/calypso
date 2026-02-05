import { Controller, Inject } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { MessagePattern } from "@nestjs/microservices";
import { NODES_UPDATED_MESSAGE_PATTERN } from "../nodes/constants/rmq.constants";
import { UpdateBoardMockCommand } from "./handlers/update-board-mock.handler";

@Controller()
export class BoardsRmqController {
    public constructor(@Inject(CommandBus) private readonly commandBus: CommandBus) {}

    @MessagePattern(NODES_UPDATED_MESSAGE_PATTERN)
    public async handleNodesUpdated(boardId: string) {
        await this.commandBus.execute(new UpdateBoardMockCommand(boardId));
    }
}
