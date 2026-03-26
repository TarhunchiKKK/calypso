import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import type { Boards, Id } from "@repo/common";
import { NodesService } from "./nodes.service";
import { Authorization } from "src/auth/lib/supabase/security/authorization.decorator";
import { Authorized } from "src/auth/lib/supabase/security/authorized.decorator";
import { TokenPayload } from "src/auth/lib/supabase/supabase.types";

@Controller("board-nodes")
@Authorization()
export class NodesController {
    public constructor(
        @Inject(NodesService) private readonly nodesService: NodesService,
    ) {}

    @Post()
    public createMany(@Authorized() payload: TokenPayload, @Body() dto: Boards.CreateManyNodesRequest) {
        return this.nodesService.createMany(payload.userId, dto);
    }   

    @Get(":boardId")
    public findAll(@Param("boardId") boardId: Id, @Authorized() payload: TokenPayload) {
        return this.nodesService.findAll(boardId, payload.userId)
    }

    @Patch()
    public updateMany(@Authorized() payload: TokenPayload,@Body() dto: Boards.UpdateManyNodesRequest) {
        return this.nodesService.updateMany(payload.userId, dto)
    }

    @Delete()
    public removeMany(@Authorized() payload: TokenPayload, @Body() dto: Boards.RemoveManyNodesRequest) {
        return this.nodesService.removeMany(payload.userId, dto)
    }   
}
