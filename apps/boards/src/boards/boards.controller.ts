import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import type { BoardsService } from "./boards.service";
import type { CreateBoardDto } from "./dto/create-board.dto";
import type { UpdateBoardDto } from "./dto/update-board.dto";

@Controller("boards")
export class BoardsController {
    public constructor(private readonly boardsService: BoardsService) {}

    @Post()
    @UsePipes(ValidationPipe)
    public async create(@Body() createBoardDto: CreateBoardDto) {
        return this.boardsService.create(createBoardDto);
    }

    @Get(":id")
    public async findAll(@Param("id") id: string) {
        return this.boardsService.findAll(id);
    }

    @Patch(":id")
    @UsePipes(ValidationPipe)
    public async update(@Param("id") id: string, @Body() updateBoardDto: UpdateBoardDto) {
        return this.boardsService.update(id, updateBoardDto);
    }

    @Delete(":id")
    public async remove(@Param("id") id: string) {
        return this.boardsService.remove(id);
    }
}
