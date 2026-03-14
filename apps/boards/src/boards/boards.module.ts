import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BoardsController } from "./boards.controller";
import { BoardsService } from "./boards.service";
import { CreateBoardCommandHandler } from "./handlers/create-board.handler";
import { FindAllBoardsQueryHandler } from "./handlers/find-all-boards.handler";
import { RemoveBoardCommandHandler } from "./handlers/remove-board.handler";
import { UpdateBoardCommandHandler } from "./handlers/update-board.handler";
import { BoardsHelper } from "./lib/boards.helper";
import { Board, BoardSchema } from "./schemas/board.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Board.name,
                schema: BoardSchema
            }
        ])
    ],
    controllers: [BoardsController],
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
