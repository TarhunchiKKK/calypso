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
import type { NoNullableFieldsDeep } from "@lib/common";
import { BoardsService } from "../boards.service";
import type { CreateBoardDto } from "../dto/create-board.dto";
import type { DuplicateBoardDto } from "../dto/duplicate-board.dto";
import { InvalidateCache, Cache } from "@api/cache";
import { BoardsCacheFns, BoardsCacheTtls } from "../lib/cache.lib";

@GrpcController()
@BoardsServiceControllerMethods()
export class BoardsGrpcController implements UnwrapGrpcResponse<BoardsServiceController> {
    public constructor(@Inject(BoardsService) private readonly boardsService: BoardsService) {}

    @InvalidateCache((dto: CreateBoardGrpcRequest) => [BoardsCacheFns.byCreator(dto.creatorId)])
    public async create(dto: CreateBoardGrpcRequest) {
        return await this.boardsService.create(dto as NoNullableFieldsDeep<CreateBoardDto>);
    }

    @InvalidateCache((dto: CreateBoardGrpcRequest) => [BoardsCacheFns.byCreator(dto.creatorId)])
    public async duplicate(dto: DuplicateProjectGrpcRequest) {
        return await this.boardsService.duplicate(dto as NoNullableFieldsDeep<DuplicateBoardDto>);
    }

    @Cache((dto: FindAllProjectsGrpcRequest) => BoardsCacheFns.byFilters(dto), BoardsCacheTtls.byFilters)
    public async findAll(dto: FindAllProjectsGrpcRequest) {
        if (!dto.filters || !dto.pagination) {
            throw Error("No 'filters' or 'pagination' field in dto");
        }

        return await this.boardsService.findAll(dto.userId, dto.filters as ProjectFilters, dto.pagination);
    }

    @Cache((dto: FindOneProjectGrpcRequest) => BoardsCacheFns.byId(dto.userId, dto.id), BoardsCacheTtls.byId)
    public async findOne(dto: FindOneProjectGrpcRequest) {
        return this.boardsService.findOne(dto.id);
    }

    @InvalidateCache((dto: UpdateBoardGrpcRequest) => [BoardsCacheFns.byCreator(dto.userId)])
    public async update(dto: UpdateBoardGrpcRequest) {
        const { id, userId, ...data } = dto;

        await this.boardsService.update(id, data);
    }

    @InvalidateCache((dto: RemoveProjectGrpcRequest) => [BoardsCacheFns.byCreator(dto.userId)])
    public async remove(dto: RemoveProjectGrpcRequest) {
        await this.boardsService.remove(dto.id);

        return {};
    }
}
