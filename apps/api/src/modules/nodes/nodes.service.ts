import type { CreateManyNodesDto, RemoveManyNodesDto, UpdateManyNodesDto } from "@lib/boards";
import type { Id } from "@lib/common";
import { Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import type { ClientProxy } from "@nestjs/microservices";
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
        @Inject(BROKER_CLIENT_INJECTION_TOKEN) private readonly brokerClient: ClientProxy
    ) {}

    public async createMany(dto: CreateManyNodesDto) {
        if (dto.nodes.length !== 0) {
            await this.commandBus.execute(new CreateManyNodesCommand(dto));

            this.brokerClient.emit(...BoardsBrokerContracts.nodesChanged.get({ id: dto.boardId }));
        }
    }

    public async findAll(boardId: Id) {
        return await this.queryBus.execute(new FindAllNodesQuery(boardId));
    }

    public async updateMany(dto: UpdateManyNodesDto) {
        if (dto.nodes.length !== 0) {
            await this.commandBus.execute(new UpdateManyNodesCommand(dto));

            this.brokerClient.emit(...BoardsBrokerContracts.nodesChanged.get({ id: dto.boardId }));
        }
    }

    public async removeMany(dto: RemoveManyNodesDto) {
        if (dto.ids.length !== 0) {
            await this.commandBus.execute(new RemoveManyNodesCommand(dto));

            this.brokerClient.emit(...BoardsBrokerContracts.nodesChanged.get({ id: dto.boardId }));
        }
    }

    public async removeNodesByBoard(boardId: Id) {
        return await this.commandBus.execute(new RemoveNodesByBoardCommand(boardId));
    }
}
