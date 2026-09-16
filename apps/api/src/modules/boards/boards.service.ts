import type { Id, PaginationOptions } from "@lib/common";
import type { ProjectFilters } from "@lib/projects";
import { Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import type { Queue } from "bullmq";
import type { OnlyIdDto } from "src/shared/dto";
import { NODES_QUEUE, type NodesQueueJobs } from "../nodes/lib/bullmq.lib";
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
import { BOARDS_QUEUE, type BoardsQueueJobs } from "./lib/bullmq.lib";

@Injectable()
export class BoardsService {
    public constructor(
        @Inject(CommandBus) private readonly commandBus: CommandBus,
        @Inject(QueryBus) private readonly queryBus: QueryBus,
        @Inject(BOARDS_QUEUE) private readonly boardsQueue: Queue,
        @Inject(NODES_QUEUE) private readonly nodesQueue: Queue
    ) {}

    public async create(dto: CreateBoardDto) {
        return await this.commandBus.execute(new CreateBoardCommand(dto));
    }

    public async duplicate(dto: DuplicateBoardDto) {
        return await this.commandBus.execute(new DuplicateBoardCommand(dto));
    }

    public async findAll(userId: Id, filters: ProjectFilters, pagination: PaginationOptions) {
        return await this.queryBus.execute(new FindAllBoardsQuery(userId, filters, pagination));
    }

    public async findOne(boardId: Id) {
        return await this.queryBus.execute(new FindOneBoardQuery(boardId));
    }

    public async update(id: Id, dto: UpdateBoardDto) {
        return await this.commandBus.execute(new UpdateBoardCommand(id, dto));
    }

    public async remove(id: Id) {
        const result = await this.commandBus.execute(new RemoveBoardCommand(id));

        await Promise.all([
            this.boardsQueue.add("remove-access-rights" satisfies BoardsQueueJobs, { id: id } satisfies OnlyIdDto),
            this.nodesQueue.add("remove-by-board-id" satisfies NodesQueueJobs, { id: id } satisfies OnlyIdDto)
        ]);

        return result;
    }

    public async changeBoardUpdateDate(boardId: Id) {
        return await this.commandBus.execute(new ChangeBoardUpdateDateCommand(boardId));
    }

    public async removeBoardAccessRights(boardId: Id) {
        return await this.commandBus.execute(new RemoveBoardAccessRightsCommand(boardId));
    }
}
