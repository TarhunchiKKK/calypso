import { Body, Controller, Inject, Param, Patch, Post, Req } from "@nestjs/common";
import { Validation } from "@repo/api";
import { type CreateBoardDto, CreateBoardDtoZodSchema, type UpdateBoardDto, UpdateBoardDtoZodSchema } from "@repo/boards-common";
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
    @Validation(CreateBoardDtoZodSchema)
    public create(@Req() request: Request, @Body() createBoardDto: CreateBoardDto) {
        const accessToken = this.cookieService.getToken(request, "access");
        return this.boardsService.create(accessToken, createBoardDto);
    }

    @Patch(":id")
    @Validation(UpdateBoardDtoZodSchema)
    public update(@Param("id") id: Id, @Authorized() payload: TokenPayload, @Body() updateBoardDto: UpdateBoardDto) {
        this.boardsService.update(id, payload.userId, updateBoardDto);
    }
}
