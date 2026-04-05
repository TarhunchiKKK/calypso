import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req } from "@nestjs/common";
import type { CreateBoardDto, UpdateBoardDto } from "@repo/boards-common";
import type { Id } from "@repo/common";
import type { Request } from "express";
import { CookieService } from "src/auth/lib/cookie/cookie.service";
import { Authorization } from "src/auth/lib/supabase/security/authorization.decorator";
import { Authorized } from "src/auth/lib/supabase/security/authorized.decorator";
import type { TokenPayload } from "src/auth/lib/supabase/supabase.types";
import { BoardsService } from "./boards.service";

@Controller("boards")
@Authorization()
export class BoardsController {
    public constructor(
        @Inject(BoardsService) private readonly boardsService: BoardsService,
        @Inject(CookieService) private readonly cookieService: CookieService
    ) {}

    @Post()
    public create(@Req() request: Request, @Body() createBoardDto: CreateBoardDto) {
        const accessToken = this.cookieService.getToken(request, "access");
        return this.boardsService.create(accessToken, createBoardDto);
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
