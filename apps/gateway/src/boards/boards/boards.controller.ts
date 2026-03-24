import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import type { Boards, Id } from "@repo/common";
import { BoardsHttpService } from "./boards.http.service";

@Controller("boards")
export class BoardsController {
    public constructor(@Inject(BoardsHttpService) private readonly boardsService: BoardsHttpService) {}

    @Post()
    public create(@Body() createBoardDto: Boards.CreateBoardDto) {
        return this.boardsService.create(createBoardDto);
    }

    @Get()
    public findAll() {
        return this.boardsService.findAll();
    }

    @Patch(":id")
    public update(@Param("id") id: Id, @Body() updateBoardDto: Boards.UpdateBoardDto) {
        return this.boardsService.update(id, updateBoardDto);
    }

    @Delete(":id")
    public remove(@Param("id") id: Id) {
        return this.boardsService.remove(id);
    }
}
