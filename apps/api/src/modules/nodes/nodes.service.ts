import { Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { FindAllBoardsQuery } from "../boards/handlers/find-all-boards.handler";
import type { CreateNodeDto } from "./dto/create-node.dto";
import type { ReplaceNodeDto } from "./dto/replace-node.dto";
import { CreateManyNodesCommand } from "./handlers/create-many-nodes.handler";
import { CreateOneNodeCommand } from "./handlers/create-one-board.handler";
import { RemoveManyNodesCommand } from "./handlers/remove-many-nodes.handler";
import { RemoveOneNodeCommand } from "./handlers/remove-one-node.handler";
import { ReplaceManyNodesCommand } from "./handlers/replace-many-nodes.handler";
import { ReplaceOneNodeCommand } from "./handlers/replace-one-node.handler";

@Injectable()
export class NodesService {
    public constructor(
        @Inject(CommandBus) private readonly commandBus: CommandBus,
        @Inject(QueryBus) private readonly queryBus: QueryBus
    ) {}

    public async createOne(dto: CreateNodeDto) {
        return await this.commandBus.execute(new CreateOneNodeCommand(dto));
    }

    public async createMany(dtos: CreateNodeDto[]) {
        return await this.commandBus.execute(new CreateManyNodesCommand(dtos));
    }

    public async findAll(boardId: string) {
        return await this.queryBus.execute(new FindAllBoardsQuery(boardId));
    }

    public async replaceOne(dto: ReplaceNodeDto) {
        return await this.commandBus.execute(new ReplaceOneNodeCommand(dto));
    }

    public async replaceMany(dtos: ReplaceNodeDto[]) {
        return await this.commandBus.execute(new ReplaceManyNodesCommand(dtos));
    }

    public async removeOne(id: string) {
        return await this.commandBus.execute(new RemoveOneNodeCommand(id));
    }

    public async removeMany(ids: string[]) {
        return await this.commandBus.execute(new RemoveManyNodesCommand(ids));
    }
}
