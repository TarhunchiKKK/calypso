import { Injectable } from "@nestjs/common";
import type { CommandBus, QueryBus } from "@nestjs/cqrs";
import type { CreateBoardRequest } from "./dto/create-board.dto";
import { CreateBoardCommand } from "./handlers/create-board.handler";

@Injectable()
export class BoardsService {
    public constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    public async create(request: CreateBoardRequest) {
        return await this.commandBus.execute(new CreateBoardCommand(request));
    }
}
