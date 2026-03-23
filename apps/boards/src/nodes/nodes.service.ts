import { Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import type { NodesArray } from "./dto/nodes-array.dto";
import { CreateManyNodesCommand } from "./handlers/create-many-nodes.handler";
import { FindAllNodesQuery } from "./handlers/find-all-nodes.handler";
import { RemoveManyNodesCommand } from "./handlers/remove-many-nodes.handler";
import { RemoveNodesByBoardCommand } from "./handlers/remove-nodes-by-board.handler";
import { UpdateManyNodesCommand } from "./handlers/update-many-nodes.handler";

@Injectable()
export class NodesService {
    public constructor(
        @Inject(CommandBus) private readonly commandBus: CommandBus,
        @Inject(QueryBus) private readonly queryBus: QueryBus
    ) {}

    public async createMany(dtos: NodesArray["data"]) {
        return await this.commandBus.execute(new CreateManyNodesCommand(dtos));
    }

    public async findAll(boardId: string) {
        return await this.queryBus.execute(new FindAllNodesQuery(boardId));
    }

    public async updateMany(dtos: NodesArray["data"]) {
        return await this.commandBus.execute(new UpdateManyNodesCommand(dtos));
    }

    public async removeMany(ids: string[]) {
        return await this.commandBus.execute(new RemoveManyNodesCommand(ids));
    }

    public async removeNodesByBoard(boardId: string) {
        return await this.commandBus.execute(new RemoveNodesByBoardCommand(boardId));
    }
}
