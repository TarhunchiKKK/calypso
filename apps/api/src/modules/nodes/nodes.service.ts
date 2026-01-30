import { Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { FindAllBoardsQuery } from "../boards/handlers/find-all-boards.handler";
import type { CreateNodeDto } from "./dto/create-node.dto";
import type { ReplaceNodeDto } from "./dto/replace-node.dto";
import { CreateManyNodesCommand } from "./handlers/create-many-nodes.handler";
import { RemoveManyNodesCommand } from "./handlers/remove-many-nodes.handler";
import { ReplaceManyNodesCommand } from "./handlers/replace-many-nodes.handler";

@Injectable()
export class NodesService {
    public constructor(
        @Inject(CommandBus) private readonly commandBus: CommandBus,
        @Inject(QueryBus) private readonly queryBus: QueryBus
    ) {}

    public async createMany(dtos: CreateNodeDto[]) {
        return await this.commandBus.execute(new CreateManyNodesCommand(dtos));
    }

    public async findAll(boardId: string) {
        return await this.queryBus.execute(new FindAllBoardsQuery(boardId));
    }

    public async replaceMany(dtos: ReplaceNodeDto[]) {
        return await this.commandBus.execute(new ReplaceManyNodesCommand(dtos));
    }

    public async removeMany(ids: string[]) {
        return await this.commandBus.execute(new RemoveManyNodesCommand(ids));
    }
}
