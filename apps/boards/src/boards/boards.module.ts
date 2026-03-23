import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardsService } from "./boards.service";
import { BoardsHttpController } from "./controllers/boards.http.controller";
import { BoardsRmqController } from "./controllers/boards.rmq.controller";
import { Board } from "./entities/board.entity";
import { CreateBoardCommandHandler } from "./handlers/create-board.handler";
import { FindAllBoardsQueryHandler } from "./handlers/find-all-boards.handler";
import { RemoveBoardCommandHandler } from "./handlers/remove-board.handler";
import { UpdateBoardCommandHandler } from "./handlers/update-board.handler";
import { BoardsHelper } from "./lib/boards.helper";

@Module({
    imports: [TypeOrmModule.forFeature([Board])],
    controllers: [BoardsHttpController, BoardsRmqController],
    providers: [
        BoardsService,
        BoardsHelper,
        CreateBoardCommandHandler,
        FindAllBoardsQueryHandler,
        UpdateBoardCommandHandler,
        RemoveBoardCommandHandler
    ]
})
export class BoardsModule {}
