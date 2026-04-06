import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { Validation } from "@repo/api";
import {
    type AnyNode,
    type CreateManyNodesDto,
    CreateManyNodesDtoZodSchema,
    type RemoveManyNodesDto,
    RemoveManyNodesDtoZodSchema,
    type UpdateManyNodesDto,
    UpdateManyNodesDtoZodSchema
} from "@repo/boards-common";
import type { Id } from "@repo/common";
import type { Observable } from "rxjs";
import { Authorization } from "src/auth/lib/supabase/security/authorization.decorator";
import { Authorized } from "src/auth/lib/supabase/security/authorized.decorator";
import type { TokenPayload } from "src/auth/lib/supabase/supabase.types";
import { NodesService } from "./nodes.service";

@Controller("board-nodes")
@Authorization()
export class NodesController {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @Post()
    @Validation(CreateManyNodesDtoZodSchema)
    public createMany(@Authorized() payload: TokenPayload, @Body() dto: CreateManyNodesDto): void {
        this.nodesService.createMany(payload.userId, dto);
    }

    @Get(":boardId")
    public findAll(@Param("boardId") boardId: Id, @Authorized() payload: TokenPayload): Observable<AnyNode[]> {
        return this.nodesService.findAll(boardId, payload.userId);
    }

    @Patch()
    @Validation(UpdateManyNodesDtoZodSchema)
    public updateMany(@Authorized() payload: TokenPayload, @Body() dto: UpdateManyNodesDto): void {
        this.nodesService.updateMany(payload.userId, dto);
    }

    @Delete()
    @Validation(RemoveManyNodesDtoZodSchema)
    public removeMany(@Authorized() payload: TokenPayload, @Body() dto: RemoveManyNodesDto): void {
        this.nodesService.removeMany(payload.userId, dto);
    }
}
