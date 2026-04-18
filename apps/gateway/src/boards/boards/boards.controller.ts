import { Controller, HttpCode, HttpStatus, Inject, Param, Patch, Post } from "@nestjs/common";
import { ExtractGrpc, Validation } from "@repo/api";
import { type CreateBoardDto, CreateBoardDtoZodSchema, type UpdateBoardDto, UpdateBoardDtoZodSchema } from "@repo/boards-common";
import type { Id } from "@repo/common";
import { Authorization } from "src/auth/lib/tokens/security/authorization.decorator";
import { Authorized } from "src/auth/lib/tokens/security/authorized.decorator";
import type { TokenPayload } from "src/auth/lib/tokens/types";
import { BoardsService } from "./boards.service";

@Controller("boards/management")
@ExtractGrpc()
@Authorization()
export class BoardsController {
    public constructor(@Inject(BoardsService) private readonly boardsService: BoardsService) {}

    @Post()
    @HttpCode(HttpStatus.ACCEPTED)
    public async create(@Authorized() payload: TokenPayload, @Validation(CreateBoardDtoZodSchema) createBoardDto: CreateBoardDto) {
        return await this.boardsService.create(payload, createBoardDto);
    }

    @Patch(":id")
    @HttpCode(HttpStatus.OK)
    public async update(@Param("id") id: Id, @Authorized() payload: TokenPayload, @Validation(UpdateBoardDtoZodSchema) updateBoardDto: UpdateBoardDto) {
        return this.boardsService.update(id, payload.id, updateBoardDto);
    }
}
