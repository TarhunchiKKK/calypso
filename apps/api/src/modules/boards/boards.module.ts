import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NodesMongooseModule } from "../nodes/nodes.module";
import { BoardsService } from "./boards.service";
import { BoardsController } from "./controllers/boards.controller";
import { BoardsRmqController } from "./controllers/boards.rmq.controller";
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

@Module({
    imports: [TypeOrmModule.forFeature([Board]), NodesMongooseModule],
    controllers: [BoardsController, BoardsRmqController],
    providers: [
        BoardsService,
        BoardsHelper,
        CreateBoardCommandHandler,
        DuplicateBoardCommandHandler,
        FindAllBoardsQueryHandler,
        FindOneBoardQueryHandler,
        UpdateBoardCommandHandler,
        RemoveBoardCommandHandler,
        ChangeBoardUpdateDateCommandHandler,
        RemoveBoardAccessRightsCommandHandler
    ]
})
export class BoardsModule {}
