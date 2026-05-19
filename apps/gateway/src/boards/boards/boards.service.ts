import { Inject, Injectable, type OnModuleInit } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";
import { BOARDS_SERVICE_NAME, BoardsGrpcMapper, type BoardsServiceClient, extractGrpcResponsePipe } from "@repo/api";
import type { CreateBoardDto, UpdateBoardDto } from "@repo/boards";
import type { Id } from "@repo/common";
import { map } from "rxjs";
import type { TokenPayload } from "src/auth/lib/tokens/types";
import { BOARDS_GRPC_CLIENT_INJECTION_TOKEN } from "../lib/grpc.constants";

@Injectable()
export class BoardsService implements OnModuleInit {
    private boardsClient: BoardsServiceClient;

    public constructor(@Inject(BOARDS_GRPC_CLIENT_INJECTION_TOKEN) private readonly grpcClient: ClientGrpc) {}

    public get client() {
        return this.boardsClient;
    }

    public onModuleInit() {
        this.boardsClient = this.grpcClient.getService<BoardsServiceClient>(BOARDS_SERVICE_NAME);
    }

    public async create(payload: TokenPayload, dto: CreateBoardDto) {
        return this.boardsClient
            .create({
                ...dto,
                creatorId: payload.id
            })
            .pipe(extractGrpcResponsePipe())
            .pipe(map(BoardsGrpcMapper.fromGrpc));
    }

    public findAll(userId: Id) {
        return this.boardsClient
            .findAll({ userId })
            .pipe(extractGrpcResponsePipe())
            .pipe(
                map((res) => {
                    if (res?.boards) {
                        return res.boards.map(BoardsGrpcMapper.fromGrpc);
                    }

                    return [];
                })
            );
    }

    public update(boardId: Id, userId: string, dto: UpdateBoardDto) {
        return this.boardsClient.update({ id: boardId, userId, ...dto }).pipe(extractGrpcResponsePipe());
    }
}
