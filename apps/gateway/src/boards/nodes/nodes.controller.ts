import { Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post } from "@nestjs/common";
import { Validation } from "@repo/api";
import {
    type CreateManyNodesDto,
    CreateManyNodesDtoZodSchema,
    type RemoveManyNodesDto,
    RemoveManyNodesDtoZodSchema,
    type UpdateManyNodesDto,
    UpdateManyNodesDtoZodSchema
} from "@repo/boards";
import type { Id } from "@repo/common";
import { ExtractGrpc } from "@repo/contracts";
import { Authorization } from "src/auth/lib/tokens/security/authorization.decorator";
import { Authorized } from "src/auth/lib/tokens/security/authorized.decorator";
import type { TokenPayload } from "src/auth/lib/tokens/types";
import { NodesService } from "./nodes.service";

@Controller("boards/nodes")
@ExtractGrpc()
@Authorization()
export class NodesController {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public createMany(@Authorized() payload: TokenPayload, @Validation(CreateManyNodesDtoZodSchema) dto: CreateManyNodesDto) {
        return this.nodesService.createMany(payload.id, dto);
    }

    @Get(":boardId")
    @HttpCode(HttpStatus.OK)
    public findAll(@Param("boardId") boardId: Id, @Authorized() payload: TokenPayload) {
        return this.nodesService.findAll(boardId, payload.id);
    }

    @Patch()
    @HttpCode(HttpStatus.OK)
    public updateMany(@Authorized() payload: TokenPayload, @Validation(UpdateManyNodesDtoZodSchema) dto: UpdateManyNodesDto) {
        return this.nodesService.updateMany(payload.id, dto);
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    public removeMany(@Authorized() payload: TokenPayload, @Validation(RemoveManyNodesDtoZodSchema) dto: RemoveManyNodesDto) {
        return this.nodesService.removeMany(payload.id, dto);
    }
}
