import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post } from "@nestjs/common";
import { Validation } from "@repo/api";
import {
    type CreateManyNodesDto,
    CreateManyNodesDtoZodSchema,
    type RemoveManyNodesDto,
    RemoveManyNodesDtoZodSchema,
    type UpdateManyNodesDto,
    UpdateManyNodesDtoZodSchema
} from "@repo/boards-common";
import type { Id } from "@repo/common";
import { Authorization } from "src/auth/lib/tokens/security/authorization.decorator";
import { Authorized } from "src/auth/lib/tokens/security/authorized.decorator";
import type { TokenPayload } from "src/auth/lib/tokens/types";
import { NodesService } from "./nodes.service";

@Controller("board/nodes")
@Authorization()
export class NodesController {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Validation(CreateManyNodesDtoZodSchema)
    public createMany(@Authorized() payload: TokenPayload, @Body() dto: CreateManyNodesDto) {
        this.nodesService.createMany(payload.id, dto);
    }

    @Get(":boardId")
    @HttpCode(HttpStatus.OK)
    public findAll(@Param("boardId") boardId: Id, @Authorized() payload: TokenPayload) {
        return this.nodesService.findAll(boardId, payload.id);
    }

    @Patch()
    @HttpCode(HttpStatus.OK)
    @Validation(UpdateManyNodesDtoZodSchema)
    public updateMany(@Authorized() payload: TokenPayload, @Body() dto: UpdateManyNodesDto) {
        this.nodesService.updateMany(payload.id, dto);
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    @Validation(RemoveManyNodesDtoZodSchema)
    public removeMany(@Authorized() payload: TokenPayload, @Body() dto: RemoveManyNodesDto) {
        this.nodesService.removeMany(payload.id, dto);
    }
}
