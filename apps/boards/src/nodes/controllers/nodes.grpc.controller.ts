import { Cache, InvalidateCache } from "@api/cache";
import {
    BoardNodesGrpcMapper,
    type BoardNodesServiceController,
    BoardNodesServiceControllerMethods,
    type CreateManyBoardNodesGrpcRequest,
    type FindAllBoardNodesGrpcRequest,
    GrpcController,
    type RemoveManyBoardNodesGrpcRequest,
    type UnwrapGrpcResponse,
    type UpdateManyBoardNodesGrpcRequest
} from "@api/contracts";
import type { AnyNode } from "@lib/boards";
import { Inject } from "@nestjs/common";
import { NodesCacheKeys, NodesCacheTtls } from "src/lib/cache.lib";
import { NodesService } from "../nodes.service";

@GrpcController()
@BoardNodesServiceControllerMethods()
export class NodesGrpcController implements UnwrapGrpcResponse<BoardNodesServiceController> {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @InvalidateCache((dto: CreateManyBoardNodesGrpcRequest) => [NodesCacheKeys.byBoardId(dto.boardId)])
    public async createMany(dto: CreateManyBoardNodesGrpcRequest) {
        await this.nodesService.createMany({
            boardId: dto.boardId,
            nodes: dto.nodes.map(BoardNodesGrpcMapper.fromGrpc)
        });
    }

    @Cache((dto: FindAllBoardNodesGrpcRequest) => NodesCacheKeys.byBoardId(dto.boardId), NodesCacheTtls.byBoardId)
    public async findAll(dto: FindAllBoardNodesGrpcRequest) {
        const nodes = (await this.nodesService.findAll(dto.boardId)) as unknown as AnyNode[];

        return { nodes: nodes.map(BoardNodesGrpcMapper.toGrpc) };
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
