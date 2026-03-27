import { Inject } from "@nestjs/common";
import {
    type BoardsServiceController,
    BoardsServiceControllerMethods,
    CheckAccess,
    type CreateBoardGrpcRequest,
    type DuplicateBoardGrpcRequest,
    type FindAllBoardsGrpcRequest,
    GrpcController,
    type RemoveBoardGrpcRequest,
    type UnwrapGrpcResponse,
    type UpdateBoardGrpcRequest
} from "@repo/api";
import { Operations } from "src/lib/auth.constants";
import { BoardsService } from "../boards.service";

@GrpcController()
@BoardsServiceControllerMethods()
export class BoardsGrpcController implements UnwrapGrpcResponse<BoardsServiceController> {
    public constructor(@Inject(BoardsService) private readonly boardsService: BoardsService) {}

    public async create(dto: CreateBoardGrpcRequest) {
        return await this.boardsService.create(dto);
    }

    @CheckAccess({
        operation: Operations.duplicate,
        extract: (dto: DuplicateBoardGrpcRequest) => ({ resourceId: dto.boardId, userId: dto.userId })
    })
    public async duplicate(dto: DuplicateBoardGrpcRequest) {
        return await this.boardsService.duplicate(dto);
    }

    public async findAll(dto: FindAllBoardsGrpcRequest) {
        return await this.boardsService.findAll(dto.userId);
    }

    @CheckAccess({
        operation: Operations.editMetadata,
        extract: (dto: UpdateBoardGrpcRequest) => ({ resourceId: dto.id, userId: dto.userId })
    })
    public async update(dto: UpdateBoardGrpcRequest) {
        const { userId, id, ...data } = dto;

        return this.boardsService.update(id, data);
    }

    @CheckAccess({
        operation: Operations.remove,
        extract: (dto: RemoveBoardGrpcRequest) => ({ resourceId: dto.id, userId: dto.userId })
    })
    public async remove(dto: RemoveBoardGrpcRequest) {
        return this.boardsService.remove(dto.userId);
    }
}
