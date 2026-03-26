import { Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import type { ClientProxy } from "@nestjs/microservices";
import { BrokerRoutingKeys } from "@repo/api";
import type { Id, OmitFields } from "@repo/common";
import { RMQ_CLIENT_INJECTION_TOKEN } from "src/lib/rmq.constants";
import { CreateManyNodesCommand } from "./handlers/create-many-nodes.handler";
import { FindAllNodesQuery } from "./handlers/find-all-nodes.handler";
import { RemoveManyNodesCommand } from "./handlers/remove-many-nodes.handler";
import { RemoveNodesByBoardCommand } from "./handlers/remove-nodes-by-board.handler";
import { UpdateManyNodesCommand } from "./handlers/update-many-nodes.handler";
import type { NodeBase } from "./schemas/node-base.schema";

@Injectable()
export class NodesService {
    public constructor(
        @Inject(CommandBus) private readonly commandBus: CommandBus,
        @Inject(QueryBus) private readonly queryBus: QueryBus,
        @Inject(RMQ_CLIENT_INJECTION_TOKEN) private readonly rmqClient: ClientProxy
    ) {}

    public async createMany(boardId: Id, nodes: OmitFields<NodeBase, "boardId">[]) {
        await this.commandBus.execute(new CreateManyNodesCommand(boardId, nodes));

        if (nodes.length !== 0) {
            this.rmqClient.emit(BrokerRoutingKeys.boards.nodesChanged, boardId);
        }
    }

    public async findAll(boardId: Id) {
        return await this.queryBus.execute(new FindAllNodesQuery(boardId));
    }

    public async updateMany(boardId: Id, nodes: OmitFields<NodeBase, "boardId">[]) {
        await this.commandBus.execute(new UpdateManyNodesCommand(boardId, nodes));

        if (nodes.length !== 0) {
            this.rmqClient.emit(BrokerRoutingKeys.boards.nodesChanged, boardId);
        }
    }

    public async removeMany(ids: Id[], boardId: Id) {
        await this.commandBus.execute(new RemoveManyNodesCommand(ids));

        this.rmqClient.emit(BrokerRoutingKeys.boards.nodesChanged, boardId);
    }

    public async removeNodesByBoard(boardId: Id) {
        return await this.commandBus.execute(new RemoveNodesByBoardCommand(boardId));
    }
}
