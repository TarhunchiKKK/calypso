import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import type { Boards } from "@repo/common";
import { BoardsHttpService } from "./boards.http.service";

@Controller("boards")
export class BoardsHttpController {
    constructor(@Inject(BoardsHttpService) private readonly boardsService: BoardsHttpService) {}

    @Post()
    public create(@Body() createBoardDto: Boards.CreateBoardDto) {
        return this.boardsService.create(createBoardDto);
    }

    @Get()
    public findAll() {
        return this.boardsService.findAll();
    }

    @Patch(":id")
    public update(@Param("id") id: string, @Body() updateBoardDto: Boards.UpdateBoardDto) {
        return this.boardsService.update(id, updateBoardDto);
    }

    @Delete(":id")
    public remove(@Param("id") id: string) {
        return this.boardsService.remove(+id);
    }
}
