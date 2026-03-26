import { Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import type { ClientProxy } from "@nestjs/microservices";
import { BoardsGrpcMapper, BrokerRoutingKeys } from "@repo/api";
import type { Id } from "@repo/common";
import { RMQ_CLIENT_INJECTION_TOKEN } from "../lib/rmq.constants";
import type { CreateBoardDto } from "./dto/create-board.dto";
import type { UpdateBoardDto } from "./dto/update-board.dto";
import { ChangeBoardUpdateDateCommand } from "./handlers/change-board-update-date.handler";
import { CreateBoardCommand } from "./handlers/create-board.handler";
import { FindAllBoardsQuery } from "./handlers/find-all-boards.handler";
import { RemoveBoardCommand } from "./handlers/remove-board.handler";
import { UpdateBoardCommand } from "./handlers/update-board.handler";

@Injectable()
export class BoardsService {
    public constructor(
        @Inject(CommandBus) private readonly commandBus: CommandBus,
        @Inject(QueryBus) private readonly queryBus: QueryBus,
        @Inject(RMQ_CLIENT_INJECTION_TOKEN) private readonly rmqClient: ClientProxy
    ) {}

    public async create(dto: CreateBoardDto) {
        return await this.commandBus.execute(new CreateBoardCommand(dto));
    }

    public async findAll(userId: Id) {
        const boards = await this.queryBus.execute(new FindAllBoardsQuery(userId));

        return boards.map(BoardsGrpcMapper.toGrpc);
    }

    public async update(id: Id, dto: UpdateBoardDto) {
        return await this.commandBus.execute(new UpdateBoardCommand(id, dto));
    }

    public async remove(id: Id) {
        const result = await this.commandBus.execute(new RemoveBoardCommand(id));

        this.rmqClient.emit(BrokerRoutingKeys.boards.events.boardRemoved, id);

        // TODO: remove `AccessRights` entities of this board

        return result;
    }

    public async changeBoardUpdateDate(boardId: Id) {
        return await this.commandBus.execute(new ChangeBoardUpdateDateCommand(boardId));
    }
}
