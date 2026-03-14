import { Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import type { CreateBoardDto } from "./dto/create-board.dto";
import type { UpdateBoardDto } from "./dto/update-board.dto";
import { CreateBoardCommand } from "./handlers/create-board.handler";
import { FindAllBoardsQuery } from "./handlers/find-all-boards.handler";
import { RemoveBoardCommand } from "./handlers/remove-board.handler";
import { UpdateBoardCommand } from "./handlers/update-board.handler";

@Injectable()
export class BoardsService {
    public constructor(
        @Inject(CommandBus) private readonly commandBus: CommandBus,
        @Inject(QueryBus) private readonly queryBus: QueryBus
    ) {}

    public async create(dto: CreateBoardDto) {
        return await this.commandBus.execute(new CreateBoardCommand(dto));
    }

    public async findAll(creatorId: string) {
        return await this.queryBus.execute(new FindAllBoardsQuery(creatorId));
    }

    public async update(id: string, dto: UpdateBoardDto) {
        return await this.commandBus.execute(new UpdateBoardCommand(id, dto));
    }

    public async remove(id: string) {
        return await this.commandBus.execute(new RemoveBoardCommand(id));
    }
}
