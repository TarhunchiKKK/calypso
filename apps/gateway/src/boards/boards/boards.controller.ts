import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import type { CreateBoardDto, UpdateBoardDto } from "@repo/boards-common";
import type { Id } from "@repo/common";
import { Authorization } from "src/auth/lib/supabase/security/authorization.decorator";
import { Authorized } from "src/auth/lib/supabase/security/authorized.decorator";
import type { TokenPayload } from "src/auth/lib/supabase/supabase.types";
import { BoardsService } from "./boards.service";

@Controller("boards")
@Authorization()
export class BoardsController {
    public constructor(@Inject(BoardsService) private readonly boardsService: BoardsService) {}

    @Post()
    public create(@Authorized() payload: TokenPayload, @Body() createBoardDto: CreateBoardDto) {
        return this.boardsService.create(payload.userId, createBoardDto);
    }

    @Get()
    public findAll(@Authorized() payload: TokenPayload) {
        return this.boardsService.findAll(payload.userId);
    }

    @Patch(":id")
    public update(@Param("id") id: Id, @Authorized() payload: TokenPayload, @Body() updateBoardDto: UpdateBoardDto) {
        return this.boardsService.update(id, payload.userId, updateBoardDto);
    }

    @Delete(":id")
    public remove(@Param("id") id: Id, @Authorized() payload: TokenPayload) {
        return this.boardsService.remove(id, payload.userId);
    }
}
