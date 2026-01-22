import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardsController } from "./boards.controller";
import { BoardsService } from "./boards.service";
import { BoardEntity } from "./entities/board.entity";
import { CreateBoardCommandHandler } from "./handlers/create-board.handler";
import { FindAllBoardsQueryHandler } from "./handlers/find-all-boards.handler";
import { UpdateBoardCommandHandler } from "./handlers/update-board.handler";

@Module({
    imports: [TypeOrmModule.forFeature([BoardEntity])],
    controllers: [BoardsController],
    providers: [BoardsService, CreateBoardCommandHandler, FindAllBoardsQueryHandler, UpdateBoardCommandHandler]
})
export class BoardsModule {}
