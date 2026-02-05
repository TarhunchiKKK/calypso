import { Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import type { ClientProxy } from "@nestjs/microservices";
import type { RemoveManyNodesDto } from "@repo/common";
import { FindAllBoardsQuery } from "../boards/handlers/find-all-boards.handler";
import { NODES_RMQ_INJECTION_TOKEN, NODES_UPDATED_MESSAGE_PATTERN } from "./constants/rmq.constants";
import type { CreateNodeDto } from "./dto/create-node.dto";
import type { ReplaceNodeDto } from "./dto/replace-node.dto";
import { CreateManyNodesCommand } from "./handlers/create-many-nodes.handler";
import { RemoveManyNodesCommand } from "./handlers/remove-many-nodes.handler";
import { ReplaceManyNodesCommand } from "./handlers/replace-many-nodes.handler";

@Injectable()
export class NodesService {
    public constructor(
        @Inject(CommandBus) private readonly commandBus: CommandBus,
        @Inject(QueryBus) private readonly queryBus: QueryBus,
        @Inject(NODES_RMQ_INJECTION_TOKEN) private readonly rmqClient: ClientProxy
    ) {}

    public async createMany(dtos: CreateNodeDto[]) {
        await this.commandBus.execute(new CreateManyNodesCommand(dtos));

        if (dtos.length) {
            this.emitNodesUpdatedEvent(dtos[0].boardId);
        }
    }

    public async findAll(boardId: string) {
        return await this.queryBus.execute(new FindAllBoardsQuery(boardId));
    }

    public async replaceMany(dtos: ReplaceNodeDto[]) {
        await this.commandBus.execute(new ReplaceManyNodesCommand(dtos));

        if (dtos.length) {
            this.emitNodesUpdatedEvent(dtos[0].boardId);
        }
    }

    public async removeMany(dto: RemoveManyNodesDto) {
        await this.commandBus.execute(new RemoveManyNodesCommand(dto.ids));

        this.emitNodesUpdatedEvent(dto.boardId);
    }

    private async emitNodesUpdatedEvent(boardId: string) {
        this.rmqClient.emit(NODES_UPDATED_MESSAGE_PATTERN, boardId);
    }
}
