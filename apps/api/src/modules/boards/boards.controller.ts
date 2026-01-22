import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CreateBoardDtoSchema, UpdateBoardDtoSchema } from "@repo/common";
import { ApiConflict, ApiNotFound } from "src/shared/swagger";
import { Validation } from "src/shared/validation";
import { Authorization } from "../auth/decorators/authorization.decorator";
import { Authorized } from "../auth/decorators/authorized.decorator";
import type { BoardsService } from "./boards.service";
import { CreateBoardRequest, CreateBoardResponse } from "./dto/create-board.dto";
import type { UpdateBoardRequest } from "./dto/update-board.dto";
import { BoardCreator } from "./middleware/board-creator.guard";
import { BoardApiType } from "./swagger/board.api-type";

@Controller("boards")
@ApiTags("boards")
@Authorization()
export class BoardsController {
    public constructor(private readonly boardsService: BoardsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ description: "Board creation data", type: CreateBoardRequest })
    @ApiCreatedResponse({ description: "Successful board creation", type: CreateBoardResponse })
    @ApiConflict("Board with such name already exists")
    @Validation(CreateBoardDtoSchema)
    public async create(@Body() request: CreateBoardRequest) {
        return await this.boardsService.create(request);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: "Account founded", type: [BoardApiType] })
    public async findAll(@Authorized("username") username: string) {
        return await this.boardsService.findAll(username);
    }

    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    @ApiNotFound("Board not found")
    @Validation(UpdateBoardDtoSchema)
    @BoardCreator()
    public async update(@Param("id") id: string, @Body() request: UpdateBoardRequest) {
        return await this.boardsService.update(id, request);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNotFound("Board not found")
    @BoardCreator()
    public async remove(@Param("id") id: string) {
        return await this.boardsService.remove(id);
    }
}
