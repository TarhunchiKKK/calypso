import {
    applyDecorators,
    BadRequestException,
    type CanActivate,
    type ExecutionContext,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UseGuards
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Request } from "express";
import { getAuthPayload } from "src/core/auth";
import { ApiForbidden } from "src/shared/swagger";
import type { Repository } from "typeorm";
import { Board } from "../entities/board.entity";

@Injectable()
class BoardCreatorGuard implements CanActivate {
    public constructor(@InjectRepository(Board) private readonly boardsRepository: Repository<Board>) {}

    public async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest() as Request;

        const { boardId, userId } = this.getParams(request);

        const board = await this.findBoard(boardId);

        this.checkPermissions(board, userId);

        return true;
    }

    private getParams(request: Request) {
        const boardId = request?.params?.id;

        if (!boardId) {
            throw new BadRequestException("Board id not found");
        }

        const { id: userId } = getAuthPayload(request);

        return { boardId, userId };
    }

    private async findBoard(id: string) {
        const board = await this.boardsRepository.findOne({
            where: {
                id: id
            },
            relations: ["creator"]
        });

        if (!board) {
            throw new NotFoundException(`Board with id ${id} not found`);
        }

        return board;
    }

    private checkPermissions(board: Board, userId: string) {
        if (board.creatorId !== userId) {
            throw new ForbiddenException(`Board with id ${board.id} not belongs to you`);
        }
    }
}

export function BoardCreator() {
    return applyDecorators(UseGuards(BoardCreatorGuard), ApiForbidden("This board not belongs to you"));
}
