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
import { Reflector } from "@nestjs/core";
import { ApiForbiddenResponse } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import type { Request } from "express";
import { getAuthPayload } from "src/shared/auth";
import type { Repository } from "typeorm";
import { Board } from "../entities/board.entity";

export function BoardCreator(boardGetter: BoardGetter) {
    return applyDecorators(
        GetBoardFromRequest(boardGetter),
        UseGuards(BoardCreatorGuard),
        ApiForbiddenResponse({ description: "This board not belongs to you" })
    );
}

type BoardGetter = (request: Request) => { id: string };

const GetBoardFromRequest = Reflector.createDecorator<BoardGetter>();

@Injectable()
class BoardCreatorGuard implements CanActivate {
    public constructor(
        @InjectRepository(Board) private readonly boardsRepository: Repository<Board>,
        private readonly reflector: Reflector
    ) {}

    public async canActivate(context: ExecutionContext) {
        const { boardId, userId } = this.getParams(context);

        const board = await this.findBoard(boardId);

        this.checkPermissions(board, userId);

        return true;
    }

    private getParams(context: ExecutionContext) {
        const getBoardFromRequest = this.reflector.get(GetBoardFromRequest, context.getHandler());

        const request = context.switchToHttp().getRequest() as Request;

        const { id: boardId } = getBoardFromRequest(request);

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
