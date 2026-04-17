import { Body, Controller, Inject, Param, Patch, Post } from "@nestjs/common";
import { Validation } from "@repo/api";
import { type CreateBoardDto, CreateBoardDtoZodSchema, type UpdateBoardDto, UpdateBoardDtoZodSchema } from "@repo/boards-common";
import type { Id } from "@repo/common";
import { Authorization } from "src/auth/lib/tokens/security/authorization.decorator";
import { Authorized } from "src/auth/lib/tokens/security/authorized.decorator";
import type { TokenPayload } from "src/auth/lib/tokens/types";
import { BoardsService } from "./boards.service";

@Controller("boards")
@Authorization()
export class BoardsController {
    public constructor(@Inject(BoardsService) private readonly boardsService: BoardsService) {}

    @Post()
    @Validation(CreateBoardDtoZodSchema)
    public create(@Authorized() payload: TokenPayload, @Body() createBoardDto: CreateBoardDto) {
        return this.boardsService.create(payload, createBoardDto);
    }

    @Patch(":id")
    @Validation(UpdateBoardDtoZodSchema)
    public update(@Param("id") id: Id, @Authorized() payload: TokenPayload, @Body() updateBoardDto: UpdateBoardDto) {
        this.boardsService.update(id, payload.id, updateBoardDto);
    }
}
