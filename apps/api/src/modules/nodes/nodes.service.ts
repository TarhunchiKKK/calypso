import type { CreateManyNodesDto, RemoveManyNodesDto, UpdateManyNodesDto } from "@lib/boards";
import type { Id } from "@lib/common";
import { Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import type { Queue } from "bullmq";
import type { OnlyIdDto } from "src/shared/dto";
import { BOARDS_QUEUE, type BoardsQueueJobs } from "../boards/lib/bullmq.lib";
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
        @Inject(BOARDS_QUEUE) private readonly boardsQueue: Queue
    ) {}

    public async createMany(dto: CreateManyNodesDto) {
        if (dto.nodes.length !== 0) {
            await this.commandBus.execute(new CreateManyNodesCommand(dto));

            await this.boardsQueue.add("update-date" satisfies BoardsQueueJobs, { id: dto.boardId } satisfies OnlyIdDto);
        }
    }

    public async findAll(boardId: Id) {
        return await this.queryBus.execute(new FindAllNodesQuery(boardId));
    }

    public async updateMany(dto: UpdateManyNodesDto) {
        if (dto.nodes.length !== 0) {
            await this.commandBus.execute(new UpdateManyNodesCommand(dto));

            await this.boardsQueue.add("update-date" satisfies BoardsQueueJobs, { id: dto.boardId } satisfies OnlyIdDto);
        }
    }

    public async removeMany(dto: RemoveManyNodesDto) {
        if (dto.ids.length !== 0) {
            await this.commandBus.execute(new RemoveManyNodesCommand(dto));

            await this.boardsQueue.add("update-date" satisfies BoardsQueueJobs, { id: dto.boardId } satisfies OnlyIdDto);
        }
    }

    public async removeNodesByBoard(boardId: Id) {
        return await this.commandBus.execute(new RemoveNodesByBoardCommand(boardId));
    }
}
