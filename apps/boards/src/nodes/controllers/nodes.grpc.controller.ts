import { Inject } from "@nestjs/common";
import {
    BoardNodesGrpcMapper,
    type BoardNodesServiceController,
    BoardNodesServiceControllerMethods,
    CheckAccess,
    type CreateManyBoardNodesGrpcRequest,
    type FindAllBoardNodesGrpcRequest,
    GrpcController,
    type RemoveManyBoardNodesGrpcRequest,
    type UnwrapGrpcResponse,
    type UpdateManyBoardNodesGrpcRequest
} from "@repo/api";
import type { AnyNode } from "@repo/common/dist/boards";
import { Operations } from "src/lib/auth.constants";
import { NodesService } from "../nodes.service";

@GrpcController()
@BoardNodesServiceControllerMethods()
export class NodesGrpcController implements UnwrapGrpcResponse<BoardNodesServiceController> {
    public constructor(@Inject(NodesService) private readonly nodesService: NodesService) {}

    @CheckAccess({
        operation: Operations.edit,
        extract: (dto: CreateManyBoardNodesGrpcRequest) => ({ resourceId: dto.boardId, userId: dto.userId })
    })
    public async createMany(dto: CreateManyBoardNodesGrpcRequest) {
        return this.nodesService.createMany({
            boardId: dto.boardId,
            nodes: dto.nodes.map(BoardNodesGrpcMapper.fromGrpc)
        });
    }

    @CheckAccess({
        operation: Operations.view,
        extract: (dto: FindAllBoardNodesGrpcRequest) => ({ resourceId: dto.boardId, userId: dto.userId })
    })
    public async findAll(dto: FindAllBoardNodesGrpcRequest) {
        const nodes = (await this.nodesService.findAll(dto.boardId)) as unknown as AnyNode[];

        return { nodes: nodes.map(BoardNodesGrpcMapper.toGrpc) };
    }

    @CheckAccess({
        operation: Operations.edit,
        extract: (dto: UpdateManyBoardNodesGrpcRequest) => ({ resourceId: dto.boardId, userId: dto.userId })
    })
    public async updateMany(dto: UpdateManyBoardNodesGrpcRequest) {
        return this.nodesService.updateMany({
            boardId: dto.boardId,
            nodes: dto.nodes.map(BoardNodesGrpcMapper.fromGrpc)
        });
    }

    @CheckAccess({
        operation: Operations.edit,
        extract: (dto: RemoveManyBoardNodesGrpcRequest) => ({ resourceId: dto.boardId, userId: dto.userId })
    })
    public async removeMany(dto: RemoveManyBoardNodesGrpcRequest) {
        return this.nodesService.removeMany(dto);
    }
}
