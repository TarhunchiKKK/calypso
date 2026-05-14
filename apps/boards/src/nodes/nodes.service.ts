import { Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import type { ClientProxy } from "@nestjs/microservices";
import { BrokerRoutingKeys } from "@repo/api";
import type { Id } from "@repo/common";
import { RMQ_CLIENT_INJECTION_TOKEN } from "src/lib/rmq.constants";
import type { CreateManyNodesDto } from "./dto/create-many-nodes.dto";
import type { RemoveManyNodesDto } from "./dto/remove-many-nodes.dto";
import type { UpdateManyNodesDto } from "./dto/update-many-nodes.dto";
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

    public async createMany(dto: CreateManyNodesDto) {
        await this.commandBus.execute(new CreateManyNodesCommand(dto));

        if (dto.nodes.length !== 0) {
            this.rmqClient.emit(BrokerRoutingKeys.boards.nodesChanged, dto.boardId);
        }
    }

    public async findAll(boardId: Id) {
        return await this.queryBus.execute(new FindAllNodesQuery(boardId));
    }

    public async updateMany(dto: UpdateManyNodesDto) {
        await this.commandBus.execute(new UpdateManyNodesCommand(dto));

        if (dto.nodes.length !== 0) {
            this.rmqClient.emit(BrokerRoutingKeys.boards.nodesChanged, dto.boardId);
        }
    }

    public async removeMany(dto: RemoveManyNodesDto) {
        await this.commandBus.execute(new RemoveManyNodesCommand(dto));

        this.rmqClient.emit(BrokerRoutingKeys.boards.nodesChanged, dto.boardId);
    }

    public async removeNodesByBoard(boardId: Id) {
        return await this.commandBus.execute(new RemoveNodesByBoardCommand(boardId));
    }
}
