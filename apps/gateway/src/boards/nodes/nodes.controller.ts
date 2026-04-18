import { Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post } from "@nestjs/common";
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
import { firstValueFrom } from "rxjs";
import { Authorization } from "src/auth/lib/tokens/security/authorization.decorator";
import { Authorized } from "src/auth/lib/tokens/security/authorized.decorator";
import type { TokenPayload } from "src/auth/lib/tokens/types";
import { NodesService } from "./nodes.service";

@Controller("boards/nodes")
@Authorization()
export class NodesController {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async createMany(@Authorized() payload: TokenPayload, @Validation(CreateManyNodesDtoZodSchema) dto: CreateManyNodesDto) {
        await firstValueFrom(this.nodesService.createMany(payload.id, dto));
    }

    @Get(":boardId")
    @HttpCode(HttpStatus.OK)
    public async findAll(@Param("boardId") boardId: Id, @Authorized() payload: TokenPayload) {
        return await firstValueFrom(this.nodesService.findAll(boardId, payload.id));
    }

    @Patch()
    @HttpCode(HttpStatus.OK)
    public async updateMany(@Authorized() payload: TokenPayload, @Validation(UpdateManyNodesDtoZodSchema) dto: UpdateManyNodesDto) {
        await firstValueFrom(this.nodesService.updateMany(payload.id, dto));
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    public async removeMany(@Authorized() payload: TokenPayload, @Validation(RemoveManyNodesDtoZodSchema) dto: RemoveManyNodesDto) {
        await firstValueFrom(this.nodesService.removeMany(payload.id, dto));
    }
}
