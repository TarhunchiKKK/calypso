import {
    type BoardsServiceController,
    BoardsServiceControllerMethods,
    type CreateBoardGrpcRequest,
    type DuplicateProjectGrpcRequest,
    type FindAllProjectsGrpcRequest,
    type FindOneProjectGrpcRequest,
    GrpcController,
    type RemoveProjectGrpcRequest,
    type UnwrapGrpcResponse,
    type UpdateBoardGrpcRequest
} from "@api/contracts";
import type { ProjectFilters } from "@lib/projects";
import { Inject } from "@nestjs/common";
import type { NoNullableFieldsDeep } from "@repo/common";
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

    public async duplicate(dto: DuplicateProjectGrpcRequest) {
        return await this.boardsService.duplicate(dto as NoNullableFieldsDeep<DuplicateBoardDto>);
    }

    public async findAll(dto: FindAllProjectsGrpcRequest) {
        if (!dto.filters || !dto.pagination) {
            throw Error("No 'filters' or 'pagination' field in dto");
        }

        return await this.boardsService.findAll(dto.userId, dto.filters as ProjectFilters, dto.pagination);
    }

    public async findOne(dto: FindOneProjectGrpcRequest) {
        return this.boardsService.findOne(dto.id);
    }

    public async update(dto: UpdateBoardGrpcRequest) {
        const { id, userId, ...data } = dto;

        await this.boardsService.update(id, data);
    }

    public async remove(dto: RemoveProjectGrpcRequest) {
        await this.boardsService.remove(dto.id);

        return {};
    }
}
