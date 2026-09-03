import { type CreateManyNodesDto, CreateManyNodesDtoZodSchema } from "@lib/boards";
import { Controller, Inject } from "@nestjs/common";
import { InvalidateCache } from "src/infra/cache/decorators/invalidate-cache.decorator";
import { Logging } from "src/infra/logs/decorators/logging.decorator";
import { Validation } from "src/shared/validation";
import { NodesCacheKeys, NodesCacheTtls } from "../lib/cache.lib";
import { NodesService } from "../nodes.service";

@Controller("nodes")
@Logging("grpc")
export class NodesController {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @InvalidateCache((dto: CreateManyNodesDto) => [NodesCacheKeys.byBoardId(dto.boardId)])
    public async createMany(@Validation(CreateManyNodesDtoZodSchema) dto: CreateManyNodesDto) {
        await this.nodesService.createMany(dto);
    }

    @Cache((dto: FindAll) => NodesCacheKeys.byBoardId(dto.boardId), NodesCacheTtls.byBoardId)
    public async findAll(dto: FindAllBoardNodesGrpcRequest) {
        return await this.nodesService.findAll(dto.boardId);
    }

    @InvalidateCache((dto: UpdateManyBoardNodesGrpcRequest) => [NodesCacheKeys.byBoardId(dto.boardId)])
    public async updateMany(dto: UpdateManyBoardNodesGrpcRequest) {
        await this.nodesService.updateMany({
            boardId: dto.boardId,
            nodes: dto.nodes.map(BoardNodesGrpcMapper.fromGrpc)
        });
    }

    @InvalidateCache((dto: RemoveManyBoardNodesGrpcRequest) => [NodesCacheKeys.byBoardId(dto.boardId)])
    public async removeMany(dto: RemoveManyBoardNodesGrpcRequest) {
        await this.nodesService.removeMany(dto);
    }
}
