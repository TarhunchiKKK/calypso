import { BoardsBrokerContracts } from "@contracts/broker";
import type { Id } from "@lib/common";
import { Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import type { ClientProxy } from "@nestjs/microservices";
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
        if (dto.nodes.length !== 0) {
            await this.commandBus.execute(new CreateManyNodesCommand(dto));

            this.rmqClient.emit(BoardsBrokerContracts.nodesChanged.pattern, BoardsBrokerContracts.nodesChanged.payload({ id: dto.boardId }));
        }
    }

    public async findAll(boardId: Id) {
        return await this.queryBus.execute(new FindAllNodesQuery(boardId));
    }

    public async updateMany(dto: UpdateManyNodesDto) {
        if (dto.nodes.length !== 0) {
            await this.commandBus.execute(new UpdateManyNodesCommand(dto));

            this.rmqClient.emit(BoardsBrokerContracts.nodesChanged.pattern, BoardsBrokerContracts.nodesChanged.payload({ id: dto.boardId }));
        }
    }

    public async removeMany(dto: RemoveManyNodesDto) {
        if (dto.ids.length !== 0) {
            await this.commandBus.execute(new RemoveManyNodesCommand(dto));

            this.rmqClient.emit(BoardsBrokerContracts.nodesChanged.pattern, BoardsBrokerContracts.nodesChanged.payload({ id: dto.boardId }));
        }
    }

    public async removeNodesByBoard(boardId: Id) {
        return await this.commandBus.execute(new RemoveNodesByBoardCommand(boardId));
    }
}
