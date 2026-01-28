import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Authorization, Authorized } from "src/core/auth";
import { Validation } from "src/shared/validation";
import type { BoardsService } from "./boards.service";
import { CreateBoardDto, CreateBoardResponse } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { BoardCreator } from "./middleware/board-creator.guard";
import { BoardApiType } from "./swagger/board.api-type";
import { CreateBoardDtoSchema, UpdateBoardDtoSchema } from "./validation/validation.schemas";

@Controller("boards")
@Authorization()
@ApiTags("boards")
export class BoardsController {
    public constructor(private readonly boardsService: BoardsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Validation(CreateBoardDtoSchema)
    @ApiBody({ description: "Board creation data", type: CreateBoardDto })
    @ApiCreatedResponse({ description: "Successful board creation", type: CreateBoardResponse })
    @ApiConflictResponse({ description: "Board with such name already exists" })
    public async create(@Body() request: CreateBoardDto) {
        return await this.boardsService.create(request);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: "Boards founded", type: [BoardApiType] })
    public async findAll(@Authorized("id") userId: string) {
        return await this.boardsService.findAll(userId);
    }

    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    @Validation(UpdateBoardDtoSchema)
    @BoardCreator(request => ({ id: request?.params?.id }))
    @ApiBody({ description: "Board update data", type: UpdateBoardDto })
    @ApiNotFoundResponse({ description: "Board not found" })
    public async update(@Param("id") id: string, @Body() request: UpdateBoardDto) {
        return await this.boardsService.update(id, request);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @BoardCreator(request => ({ id: request?.params?.id }))
    @ApiNotFoundResponse({ description: "Board not found" })
    @ApiNoContentResponse({ description: "Board successfully deleted" })
    public async remove(@Param("id") id: string) {
        return await this.boardsService.remove(id);
    }
}
