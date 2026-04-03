import { Inject, Injectable, type OnModuleInit } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";
import { BOARDS_SERVICE_NAME, BoardsGrpcMapper, type BoardsServiceClient } from "@repo/api";
import type { CreateBoardDto, UpdateBoardDto } from "@repo/boards-common";
import type { Id } from "@repo/common";
import { map } from "rxjs";
import { BOARDS_GRPC_CLIENT_INJECTION_TOKEN } from "../lib/grpc.constants";

@Injectable()
export class BoardsService implements OnModuleInit {
    private boardsClient: BoardsServiceClient;

    public constructor(@Inject(BOARDS_GRPC_CLIENT_INJECTION_TOKEN) private readonly grpcClient: ClientGrpc) {}

    public onModuleInit() {
        this.boardsClient = this.grpcClient.getService<BoardsServiceClient>(BOARDS_SERVICE_NAME);
    }

    public create(dto: CreateBoardDto) {
        return this.boardsClient.create(dto);
    }

    public findAll(userId: string) {
        return this.boardsClient.findAll({ userId }).pipe(
            map(res => {
                if (res.data?.boards) {
                    return res.data.boards.map(BoardsGrpcMapper.fromGrpc);
                }
                return [];
            })
        );
    }

    public update(id: Id, userId: string, dto: UpdateBoardDto) {
        return this.boardsClient.update({ id, userId, ...dto });
    }

    public remove(id: Id, userId: string) {
        return this.boardsClient.remove({ id, userId });
    }
}
