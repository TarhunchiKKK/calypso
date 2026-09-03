import {
    type CreateManyNodesDto,
    CreateManyNodesDtoZodSchema,
    type RemoveManyNodesDto,
    RemoveManyNodesDtoZodSchema,
    type UpdateManyNodesDto,
    UpdateManyNodesDtoZodSchema
} from "@lib/boards";
import type { Id } from "@lib/common";
import { Controller, Get, Inject, Param } from "@nestjs/common";
import { InvalidateCache } from "src/infra/cache/decorators/invalidate-cache.decorator";
import { Logging } from "src/infra/logs/decorators/logging.decorator";
import { Validation } from "src/shared/validation";
import { NodesCacheKeys } from "../lib/cache.lib";
import { NodesService } from "../nodes.service";

@Controller("nodes")
@Logging("grpc")
export class NodesController {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @InvalidateCache((dto: CreateManyNodesDto) => [NodesCacheKeys.byBoardId(dto.boardId)])
    public async createMany(@Validation(CreateManyNodesDtoZodSchema) dto: CreateManyNodesDto) {
        await this.nodesService.createMany(dto);
    }

    @Get(":boardId")
    public async findAll(@Param("boardId") boardId: Id) {
        return await this.nodesService.findAll(boardId);
    }

    @InvalidateCache((dto: UpdateManyNodesDto) => [NodesCacheKeys.byBoardId(dto.boardId)])
    public async updateMany(@Validation(UpdateManyNodesDtoZodSchema) dto: UpdateManyNodesDto) {
        await this.nodesService.updateMany(dto);
    }

    @InvalidateCache((dto: RemoveManyNodesDto) => [NodesCacheKeys.byBoardId(dto.boardId)])
    public async removeMany(@Validation(RemoveManyNodesDtoZodSchema) dto: RemoveManyNodesDto) {
        await this.nodesService.removeMany(dto);
    }
}
