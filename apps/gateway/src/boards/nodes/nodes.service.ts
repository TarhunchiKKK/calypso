import { Inject, Injectable, Logger, type OnModuleInit } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";
import { BOARD_NODES_SERVICE_NAME, BoardNodesGrpcMapper, type BoardNodesServiceClient, extractGrpcResponsePipe } from "@repo/api";
import type { CreateManyNodesDto, RemoveManyNodesDto, UpdateManyNodesDto } from "@repo/boards-common";
import type { Id } from "@repo/common";
import { map } from "rxjs";
import { BOARDS_GRPC_CLIENT_INJECTION_TOKEN } from "../lib/grpc.constants";

@Injectable()
export class NodesService implements OnModuleInit {
    private nodesClient: BoardNodesServiceClient;

    public constructor(@Inject(BOARDS_GRPC_CLIENT_INJECTION_TOKEN) private readonly grpcClient: ClientGrpc) {}

    public onModuleInit() {
        this.nodesClient = this.grpcClient.getService<BoardNodesServiceClient>(BOARD_NODES_SERVICE_NAME);
    }

    public createMany(userId: Id, dto: CreateManyNodesDto) {
        const mappedNodes = dto.nodes.map(BoardNodesGrpcMapper.toGrpc);

        return this.nodesClient
            .createMany({
                userId,
                boardId: dto.boardId,
                nodes: mappedNodes
            })
            .pipe(extractGrpcResponsePipe());
    }

    public findAll(boardId: Id, userId: Id) {
        return this.nodesClient
            .findAll({ boardId, userId })
            .pipe(extractGrpcResponsePipe())
            .pipe(
                map(res => {
                    if (res.nodes) {
                        return res.nodes.map(BoardNodesGrpcMapper.fromGrpc);
                    }

                    return [];
                })
            );
    }

    public updateMany(userId: Id, dto: UpdateManyNodesDto) {
        const mappedNodes = dto.nodes.map(BoardNodesGrpcMapper.toGrpc);

        return this.nodesClient
            .updateMany({
                userId,
                boardId: dto.boardId,
                nodes: mappedNodes
            })
            .pipe(extractGrpcResponsePipe());
    }

    public removeMany(userId: Id, dto: RemoveManyNodesDto) {
        return this.nodesClient
            .removeMany({
                userId,
                boardId: dto.boardId,
                ids: dto.ids
            })
            .pipe(extractGrpcResponsePipe());
    }
}
