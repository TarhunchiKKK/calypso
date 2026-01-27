import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Authorization, Authorized } from "src/core/auth";
import { Validation } from "src/shared/validation";
import type { BoardsService } from "./boards.service";
import type { CreateBoardDto } from "./dto/create-board.dto";
import type { UpdateBoardDto } from "./dto/update-board.dto";
import { BoardCreator } from "./middleware/board-creator.guard";
import { BoardsApiController } from "./swagger/boards-api-controller";
import { CreateBoardDtoSchema, UpdateBoardDtoSchema } from "./validation/validation.schemas";

@Controller("boards")
@ApiTags("boards")
@Authorization()
@BoardsApiController()
export class BoardsController {
    public constructor(private readonly boardsService: BoardsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Validation(CreateBoardDtoSchema)
    public async create(@Body() request: CreateBoardDto) {
        return await this.boardsService.create(request);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @BoardCreator()
    public async findAll(@Authorized("id") userId: string) {
        return await this.boardsService.findAll(userId);
    }

    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    @Validation(UpdateBoardDtoSchema)
    @BoardCreator()
    public async update(@Param("id") id: string, @Body() request: UpdateBoardDto) {
        return await this.boardsService.update(id, request);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @BoardCreator()
    public async remove(@Param("id") id: string) {
        return await this.boardsService.remove(id);
    }
}
