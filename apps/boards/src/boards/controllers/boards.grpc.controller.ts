import { Cache, InvalidateCache } from "@api/cache";
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
} from "@contracts/grpc";
import type { NoNullableFieldsDeep } from "@lib/common";
import type { ProjectFilters } from "@lib/projects";
import { Inject } from "@nestjs/common";
import { NodesCacheKeys } from "src/nodes/lib/cache.lib";
import { BoardsService } from "../boards.service";
import type { CreateBoardDto } from "../dto/create-board.dto";
import type { DuplicateBoardDto } from "../dto/duplicate-board.dto";
import { BoardsCacheKeys, BoardsCacheTtls } from "../lib/cache.lib";

@GrpcController()
@BoardsServiceControllerMethods()
export class BoardsGrpcController implements UnwrapGrpcResponse<BoardsServiceController> {
    public constructor(@Inject(BoardsService) private readonly boardsService: BoardsService) {}

    @InvalidateCache((dto: CreateBoardGrpcRequest) => [BoardsCacheKeys.byCreator(dto.creatorId)])
    public async create(dto: CreateBoardGrpcRequest) {
        return await this.boardsService.create(dto as NoNullableFieldsDeep<CreateBoardDto>);
    }

    @InvalidateCache((dto: CreateBoardGrpcRequest) => [BoardsCacheKeys.byCreator(dto.creatorId)])
    public async duplicate(dto: DuplicateProjectGrpcRequest) {
        return await this.boardsService.duplicate(dto as NoNullableFieldsDeep<DuplicateBoardDto>);
    }

    @Cache((dto: FindAllProjectsGrpcRequest) => BoardsCacheKeys.byFilters(dto), BoardsCacheTtls.byFilters)
    public async findAll(dto: FindAllProjectsGrpcRequest) {
        if (!dto.filters || !dto.pagination) {
            throw Error("No 'filters' or 'pagination' field in dto");
        }

        return await this.boardsService.findAll(dto.userId, dto.filters as ProjectFilters, dto.pagination);
    }

    @Cache((dto: FindOneProjectGrpcRequest) => BoardsCacheKeys.byId(dto.userId, dto.id), BoardsCacheTtls.byId)
    public async findOne(dto: FindOneProjectGrpcRequest) {
        return this.boardsService.findOne(dto.id);
    }

    @InvalidateCache((dto: UpdateBoardGrpcRequest) => [BoardsCacheKeys.byCreator(dto.userId)])
    public async update(dto: UpdateBoardGrpcRequest) {
        const { id, userId, ...data } = dto;

        await this.boardsService.update(id, data);
    }

    @InvalidateCache((dto: RemoveProjectGrpcRequest) => [BoardsCacheKeys.byCreator(dto.userId), NodesCacheKeys.byBoardId(dto.id)])
    public async remove(dto: RemoveProjectGrpcRequest) {
        await this.boardsService.remove(dto.id);

        return {};
    }
}
