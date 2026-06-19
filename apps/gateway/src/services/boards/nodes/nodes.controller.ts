import { Validation } from "@api/common";
import { Logging } from "@api/logs";
import { ExtractGrpc } from "@contracts/grpc";
import {
    type CreateManyNodesDto,
    CreateManyNodesDtoZodSchema,
    type RemoveManyNodesDto,
    RemoveManyNodesDtoZodSchema,
    type UpdateManyNodesDto,
    UpdateManyNodesDtoZodSchema
} from "@lib/boards";
import type { Id } from "@lib/common";
import { Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post } from "@nestjs/common";
import type { TokenPayload } from "src/auth/basic/lib/tokens.types";
import { Authorization } from "src/auth/basic/security/authorization.decorator";
import { Authorized } from "src/auth/basic/security/authorized.decorator";
import { NodesService } from "./nodes.service";
import { NodesControllerApiType } from "./swagger/controller.swagger";

@Controller("boards/nodes")
@ExtractGrpc()
@Authorization()
@Logging("http")
@NodesControllerApiType()
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
