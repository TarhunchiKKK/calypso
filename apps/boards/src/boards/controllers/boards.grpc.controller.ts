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
import { asType, type NoNullableFields } from "@repo/common";
import { Operations } from "src/lib/auth.constants";
import { BoardsService } from "../boards.service";
import type { CreateBoardDto } from "../dto/create-board.dto";
import type { DuplicateBoardDto } from "../dto/duplicate-board.dto";

@GrpcController()
@BoardsServiceControllerMethods()
export class BoardsGrpcController implements UnwrapGrpcResponse<BoardsServiceController> {
    public constructor(@Inject(BoardsService) private readonly boardsService: BoardsService) {}

    public async create(dto: CreateBoardGrpcRequest) {
        return await this.boardsService.create(asType<CreateBoardDto>(dto));
    }

    @CheckAccess({
        operation: Operations.duplicate,
        extract: (dto: NoNullableFields<DuplicateBoardGrpcRequest>) => ({ resourceId: dto.id, userId: dto.creator.id })
    })
    public async duplicate(dto: DuplicateBoardGrpcRequest) {
        return await this.boardsService.duplicate(asType<DuplicateBoardDto>(dto));
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
