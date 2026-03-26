import { Inject } from "@nestjs/common";
import {
    type BoardsServiceController,
    BoardsServiceControllerMethods,
    type CreateBoardGrpcRequest,
    type FindAllBoardsGrpcRequest,
    GrpcController,
    type RemoveBoardGrpcRequest,
    type UnwrapGrpcResponse,
    type UpdateBoardGrpcRequest
} from "@repo/api";
import { BoardsService } from "../boards.service";

@GrpcController()
@BoardsServiceControllerMethods()
export class BoardsGrpcController implements UnwrapGrpcResponse<BoardsServiceController> {
    public constructor(@Inject(BoardsService) private readonly boardsService: BoardsService) {}

    public async create(dto: CreateBoardGrpcRequest) {
        return this.boardsService.create(dto);
    }

    public async findAll(dto: FindAllBoardsGrpcRequest) {
        const boards = await this.boardsService.findAll(dto.userId);

        return { boards };
    }

    public async update(dto: UpdateBoardGrpcRequest) {
        const { userId, id, ...data } = dto;

        return this.boardsService.update(id, data);
    }

    public async remove(dto: RemoveBoardGrpcRequest) {
        return this.boardsService.remove(dto.userId);
    }
}
