import { Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import type { ClientProxy } from "@nestjs/microservices";
import { RmqRoutingKeys } from "@repo/api";
import { RMQ_CLIENT_INJECTION_TOKEN } from "src/lib/rmq.constants";
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
        @Inject(QueryBus) private readonly queryBus: QueryBus,
        @Inject(RMQ_CLIENT_INJECTION_TOKEN) private readonly rmqClient: ClientProxy
    ) {}

    public async createMany(dtos: NodesArray["data"]) {
        await this.commandBus.execute(new CreateManyNodesCommand(dtos));

        if (dtos.length !== 0) {
            this.rmqClient.emit(RmqRoutingKeys.boards.events.nodesChanged, dtos[0]?.boardId);
        }
    }

    public async findAll(boardId: string) {
        return await this.queryBus.execute(new FindAllNodesQuery(boardId));
    }

    public async updateMany(dtos: NodesArray["data"]) {
        await this.commandBus.execute(new UpdateManyNodesCommand(dtos));

        if (dtos.length !== 0) {
            this.rmqClient.emit(RmqRoutingKeys.boards.events.nodesChanged, dtos[0]?.boardId);
        }
    }

    public async removeMany(ids: string[], boardId: string) {
        await this.commandBus.execute(new RemoveManyNodesCommand(ids));

        this.rmqClient.emit(RmqRoutingKeys.boards.events.nodesChanged, boardId);
    }

    public async removeNodesByBoard(boardId: string) {
        return await this.commandBus.execute(new RemoveNodesByBoardCommand(boardId));
    }
}
