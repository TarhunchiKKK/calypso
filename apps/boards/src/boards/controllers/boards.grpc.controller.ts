import { Inject } from "@nestjs/common";
import {
    type BoardsServiceController,
    BoardsServiceControllerMethods,
    CheckAccess,
    type CreateBoardGrpcRequest,
    type FindOneProjectGrpcRequest,
    GrpcController,
    type UnwrapGrpcResponse,
    type UpdateBoardGrpcRequest
} from "@repo/api";
import type { DuplicateProjectGrpcRequest, FindAllProjectsGrpcRequest, RemoveProjectGrpcRequest } from "@repo/api/dist/grpc/generated/projects";
import type { NoNullableFields, NoNullableFieldsDeep } from "@repo/common";
import { Operations } from "src/lib/auth.constants";
import { BoardsService } from "../boards.service";
import type { CreateBoardDto } from "../dto/create-board.dto";
import type { DuplicateBoardDto } from "../dto/duplicate-board.dto";

@GrpcController()
@BoardsServiceControllerMethods()
export class BoardsGrpcController implements UnwrapGrpcResponse<BoardsServiceController> {
    public constructor(@Inject(BoardsService) private readonly boardsService: BoardsService) {}

    public async create(dto: CreateBoardGrpcRequest) {
        return await this.boardsService.create(dto as NoNullableFieldsDeep<CreateBoardDto>);
    }

    @CheckAccess({
        operation: Operations.duplicate,
        extract: (dto: NoNullableFields<DuplicateProjectGrpcRequest>) => ({ resourceId: dto.id, userId: dto.creator.id })
    })
    public async duplicate(dto: DuplicateProjectGrpcRequest) {
        return await this.boardsService.duplicate(dto as NoNullableFieldsDeep<DuplicateBoardDto>);
    }

    public async findAll(dto: FindAllProjectsGrpcRequest) {
        return await this.boardsService.findAll(dto.userId);
    }

    @CheckAccess({
        operation: Operations.view,
        extract: (dto: FindOneProjectGrpcRequest) => ({ resourceId: dto.id, userId: dto.userId })
    })
    public async findOne(dto: FindOneProjectGrpcRequest) {
        return this.boardsService.findOne(dto.id);
    }

    @CheckAccess({
        operation: Operations.editMetadata,
        extract: (dto: UpdateBoardGrpcRequest) => ({ resourceId: dto.id, userId: dto.userId })
    })
    public async update(dto: UpdateBoardGrpcRequest) {
        const { id, userId, ...data } = dto;

        return this.boardsService.update(id, data);
    }

    @CheckAccess({
        operation: Operations.remove,
        extract: (dto: RemoveProjectGrpcRequest) => ({ resourceId: dto.id, userId: dto.userId })
    })
    public async remove(dto: RemoveProjectGrpcRequest) {
        return this.boardsService.remove(dto.userId);
    }
}
