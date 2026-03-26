import { Inject } from "@nestjs/common";
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
} from "@repo/api";
import type { AnyNode } from "@repo/common/dist/boards";
import { NodesService } from "../nodes.service";

@GrpcController()
@BoardNodesServiceControllerMethods()
export class NodesGrpcController implements UnwrapGrpcResponse<BoardNodesServiceController> {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    public async createMany(dto: CreateManyBoardNodesGrpcRequest) {
        return this.nodesService.createMany(dto.boardId, dto.nodes.map(BoardNodesGrpcMapper.fromGrpc));
    }

    public async findAll(dto: FindAllBoardNodesGrpcRequest) {
        const nodes = (await this.nodesService.findAll(dto.boardId)) as unknown as AnyNode[];

        return { nodes: nodes.map(BoardNodesGrpcMapper.toGrpc) };
    }

    public async updateMany(dto: UpdateManyBoardNodesGrpcRequest) {
        return this.nodesService.updateMany(dto.boardId, dto.nodes.map(BoardNodesGrpcMapper.fromGrpc));
    }

    public async removeMany(dto: RemoveManyBoardNodesGrpcRequest) {
        return this.nodesService.removeMany(dto.nodeIds, dto.boardId);
    }
}
