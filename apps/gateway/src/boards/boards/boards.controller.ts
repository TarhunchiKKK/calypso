import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import type { Boards, Id } from "@repo/common";
import { Authorization } from "src/auth/lib/supabase/security/authorization.decorator";
import { Authorized } from "src/auth/lib/supabase/security/authorized.decorator";
import type { TokenPayload } from "src/auth/lib/supabase/supabase.types";
import { BoardsService } from "./boards.service";

@Controller("boards")
@Authorization()
export class BoardsController {
    public constructor(@Inject(BoardsService) private readonly boardsService: BoardsService) {}

    @Post()
    public create(@Body() createBoardDto: Boards.CreateBoardDto) {
        return this.boardsService.create(createBoardDto);
    }

    @Get()
    public findAll(@Authorized() payload: TokenPayload) {
        return this.boardsService.findAll(payload.userId);
    }

    @Patch(":id")
    public update(
        @Param("id") id: Id,
        @Authorized() payload: TokenPayload,
        @Body() updateBoardDto: Boards.UpdateBoardDto
    ) {
        return this.boardsService.update(id, payload.userId, updateBoardDto);
    }

    @Delete(":id")
    public remove(@Param("id") id: Id, @Authorized() payload: TokenPayload) {
        return this.boardsService.remove(id, payload.userId);
    }
}
