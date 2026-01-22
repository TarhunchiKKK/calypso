import { Injectable } from "@nestjs/common";
import type { CommandBus, QueryBus } from "@nestjs/cqrs";
import type { CreateBoardRequest } from "./dto/create-board.dto";
import type { UpdateBoardRequest } from "./dto/update-board.dto";
import { CreateBoardCommand } from "./handlers/create-board.handler";
import { FindAllBoardsQuery } from "./handlers/find-all-boards.handler";
import { RemoveBoardCommand } from "./handlers/remove-board.handler";
import { UpdateBoardCommand } from "./handlers/update-board.handler";

@Injectable()
export class BoardsService {
    public constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    public async create(request: CreateBoardRequest) {
        return await this.commandBus.execute(new CreateBoardCommand(request));
    }

    public async findAll(username: string) {
        return await this.queryBus.execute(new FindAllBoardsQuery(username));
    }

    public async update(id: string, request: UpdateBoardRequest) {
        return await this.commandBus.execute(new UpdateBoardCommand(id, request));
    }

    public async remove(id: string) {
        return await this.commandBus.execute(new RemoveBoardCommand(id));
    }
}
