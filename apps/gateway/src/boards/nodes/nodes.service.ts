import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { BOARD_NODES_SERVICE_NAME, BoardNodesServiceClient } from "@repo/api";
import { BOARDS_GRPC_CLIENT_INJECTION_TOKEN } from "../lib/grpc.constants";
import { ClientGrpc } from "@nestjs/microservices";
import { Boards, Id } from "@repo/common";
import { NodesGrpcMapper } from "./nodes.mapper";

@Injectable()
export class NodesService implements OnModuleInit {
    private nodesClient: BoardNodesServiceClient;

    public constructor(@Inject(BOARDS_GRPC_CLIENT_INJECTION_TOKEN) private readonly grpcClient: ClientGrpc){}

    public onModuleInit() {
        this.nodesClient = this.grpcClient.getService<BoardNodesServiceClient>(BOARD_NODES_SERVICE_NAME);
    }

    public createMany(userId: Id, dto: Boards.CreateManyNodesRequest) {
        const mappedNodes = dto.nodes.map(NodesGrpcMapper.mapNode)

        return this.nodesClient.createMany({
            userId, 
            boardId: dto.boardId, 
            nodes: mappedNodes
        })
    }

    public findAll(boardId: Id, userId: Id, ) {
        return this.nodesClient.findAll({boardId,userId })
    }

    public updateMany(userId: Id, dto: Boards.UpdateManyNodesRequest) {
        const mappedNodes = dto.nodes.map(NodesGrpcMapper.mapNode)
        
        return this.nodesClient.updateMany({
            userId, 
            boardId: dto.boardId, 
            nodes: mappedNodes
        })
    }

    public removeMany( userId: Id, dto: Boards.RemoveManyNodesRequest) {
        return this.nodesClient.removeMany({
            userId, 
            boardId: dto.boardId, 
            nodeIds: dto.ids
        })
    }
}
