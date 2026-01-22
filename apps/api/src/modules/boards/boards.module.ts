import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardsController } from "./boards.controller";
import { BoardsHelper } from "./boards.helper";
import { BoardsService } from "./boards.service";
import { BoardEntity } from "./entities/board.entity";

@Module({
    imports: [TypeOrmModule.forFeature([BoardEntity])],
    controllers: [BoardsController],
    providers: [BoardsService, BoardsHelper]
})
export class BoardsModule {}
