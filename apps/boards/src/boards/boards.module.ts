import { Module } from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { BoardsController } from "./boards.controller";
import { CreateBoardCommandHandler } from "./handlers/create-board.handler";
import { FindAllBoardsQueryHandler } from "./handlers/find-all-boards.handler";
import { UpdateBoardCommandHandler } from "./handlers/update-board.handler";
import { RemoveBoardCommandHandler } from "./handlers/remove-board.handler";
import { MongooseModule } from "@nestjs/mongoose";
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
    providers: [BoardsService, CreateBoardCommandHandler, FindAllBoardsQueryHandler, UpdateBoardCommandHandler, RemoveBoardCommandHandler ]
})
export class BoardsModule {}
