import { BrokerRoutingKeys } from "@api/common";
import { BoardsGrpcMapper } from "@api/contracts";
import type { ProjectFilters } from "@lib/projects";
import { Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import type { ClientProxy } from "@nestjs/microservices";
import type { Id, PaginationOptions } from "@repo/common";
import { RMQ_CLIENT_INJECTION_TOKEN } from "../lib/rmq.constants";
import type { CreateBoardDto } from "./dto/create-board.dto";
import type { DuplicateBoardDto } from "./dto/duplicate-board.dto";
import type { UpdateBoardDto } from "./dto/update-board.dto";
import { ChangeBoardUpdateDateCommand } from "./handlers/change-board-update-date.handler";
import { CreateBoardCommand } from "./handlers/create-board.handler";
import { DuplicateBoardCommand } from "./handlers/duplicate-board.handler";
import { FindAllBoardsQuery } from "./handlers/find-all-boards.handler";
import { FindOneBoardQuery } from "./handlers/find-one-board.handler";
import { RemoveBoardCommand } from "./handlers/remove-board.handler";
import { RemoveBoardAccessRightsCommand } from "./handlers/remove-board-access-rights.handler";
import { UpdateBoardCommand } from "./handlers/update-board.handler";

@Injectable()
export class BoardsService {
    public constructor(
        @Inject(CommandBus) private readonly commandBus: CommandBus,
        @Inject(QueryBus) private readonly queryBus: QueryBus,
        @Inject(RMQ_CLIENT_INJECTION_TOKEN) private readonly rmqClient: ClientProxy
    ) {}

    public async create(dto: CreateBoardDto) {
        const board = await this.commandBus.execute(new CreateBoardCommand(dto));
        return BoardsGrpcMapper.toGrpc(board);
    }

    public async duplicate(dto: DuplicateBoardDto) {
        const board = await this.commandBus.execute(new DuplicateBoardCommand(dto));

        return BoardsGrpcMapper.toGrpc(board);
    }

    public async findAll(userId: Id, filters: ProjectFilters, pagination: PaginationOptions) {
        const boards = await this.queryBus.execute(new FindAllBoardsQuery(userId, filters, pagination));

        const mappedBoards = boards.map(BoardsGrpcMapper.toGrpc);

        return { boards: mappedBoards };
    }

    public async findOne(boardId: Id) {
        const board = await this.queryBus.execute(new FindOneBoardQuery(boardId));

        return BoardsGrpcMapper.toGrpc(board);
    }

    public async update(id: Id, dto: UpdateBoardDto) {
        return await this.commandBus.execute(new UpdateBoardCommand(id, dto));
    }

    public async remove(id: Id) {
        const result = await this.commandBus.execute(new RemoveBoardCommand(id));

        this.rmqClient.emit(BrokerRoutingKeys.boards.boardRemoved, id);

        return result;
    }

    public async changeBoardUpdateDate(boardId: Id) {
        return await this.commandBus.execute(new ChangeBoardUpdateDateCommand(boardId));
    }

    public async removeBoardAccessRights(boardId: Id) {
        return await this.commandBus.execute(new RemoveBoardAccessRightsCommand(boardId));
    }
}
