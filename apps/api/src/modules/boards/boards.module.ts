import { BullModule, getQueueToken } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NodesModule } from "../nodes/nodes.module";
import { BoardsController } from "./boards.controller";
import { BoardsProcessor } from "./boards.processor";
import { BoardsService } from "./boards.service";
import { Board } from "./entities/board.entity";
import { ChangeBoardUpdateDateCommandHandler } from "./handlers/change-board-update-date.handler";
import { CreateBoardCommandHandler } from "./handlers/create-board.handler";
import { DuplicateBoardCommandHandler } from "./handlers/duplicate-board.handler";
import { FindAllBoardsQueryHandler } from "./handlers/find-all-boards.handler";
import { FindOneBoardQueryHandler } from "./handlers/find-one-board.handler";
import { RemoveBoardCommandHandler } from "./handlers/remove-board.handler";
import { RemoveBoardAccessRightsCommandHandler } from "./handlers/remove-board-access-rights.handler";
import { UpdateBoardCommandHandler } from "./handlers/update-board.handler";
import { BoardsHelper } from "./lib/boards.helper";
import { BOARDS_QUEUE } from "./lib/bullmq.lib";

@Module({
    imports: [
        TypeOrmModule.forFeature([Board]),
        NodesModule,
        BullModule.registerQueue({
            name: BOARDS_QUEUE
        })
    ],
    controllers: [BoardsController],
    providers: [
        BoardsService,
        BoardsHelper,
        BoardsProcessor,
        CreateBoardCommandHandler,
        DuplicateBoardCommandHandler,
        FindAllBoardsQueryHandler,
        FindOneBoardQueryHandler,
        UpdateBoardCommandHandler,
        RemoveBoardCommandHandler,
        ChangeBoardUpdateDateCommandHandler,
        RemoveBoardAccessRightsCommandHandler
    ],
    exports: [getQueueToken(BOARDS_QUEUE)]
})
export class BoardsModule {}
