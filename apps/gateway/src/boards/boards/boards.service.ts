import { Inject, Injectable, type OnModuleInit } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";
import { BOARDS_SERVICE_NAME, BoardsGrpcMapper, type BoardsServiceClient, extractGrpcResponse } from "@repo/api";
import type { CreateBoardDto, UpdateBoardDto } from "@repo/boards-common";
import type { Id } from "@repo/common";
import { map } from "rxjs";
import { SupabaseService } from "src/auth/lib/supabase/supabase.service";
import { BOARDS_GRPC_CLIENT_INJECTION_TOKEN } from "../lib/grpc.constants";

@Injectable()
export class BoardsService implements OnModuleInit {
    private boardsClient: BoardsServiceClient;

    public constructor(
        @Inject(BOARDS_GRPC_CLIENT_INJECTION_TOKEN) private readonly grpcClient: ClientGrpc,
        @Inject(SupabaseService) private readonly supabaseService: SupabaseService
    ) {}

    public get client() {
        return this.boardsClient;
    }

    public onModuleInit() {
        this.boardsClient = this.grpcClient.getService<BoardsServiceClient>(BOARDS_SERVICE_NAME);
    }

    public async create(accessToken: string, dto: CreateBoardDto) {
        const user = await this.supabaseService.findUser(accessToken);

        const response = this.boardsClient.create({
            ...dto,
            creator: user
        });

        return extractGrpcResponse(response);
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

    public update(boardId: Id, userId: string, dto: UpdateBoardDto) {
        this.boardsClient.update({ id: boardId, userId, ...dto });
    }
}
