import { Inject, Injectable, type OnModuleInit } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";
import { BOARDS_SERVICE_NAME, type BoardsServiceClient } from "@repo/api";
import type { Boards, Id } from "@repo/common";
import { BOARDS_GRPC_CLIENT_INJECTION_TOKEN } from "../lib/grpc.constants";

@Injectable()
export class BoardsService implements OnModuleInit {
    private boardsClient: BoardsServiceClient;

    public constructor(@Inject(BOARDS_GRPC_CLIENT_INJECTION_TOKEN) private readonly grpcClient: ClientGrpc) {}

    public onModuleInit() {
        this.boardsClient = this.grpcClient.getService<BoardsServiceClient>(BOARDS_SERVICE_NAME);
    }

    public create(dto: Boards.CreateBoardDto) {
        return this.boardsClient.create(dto);
    }

    public findAll(userId: string) {
        return this.boardsClient.findAll({ userId });
    }

    public update(id: Id, userId: string, dto: Boards.UpdateBoardDto) {
        return this.boardsClient.update({ id, userId, ...dto });
    }

    public remove(id: Id, userId: string) {
        return this.boardsClient.remove({ id, userId });
    }
}
