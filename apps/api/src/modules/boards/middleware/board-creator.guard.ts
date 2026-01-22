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
import type { JwtPayload } from "src/modules/auth/lib/jwt.lib";
import { REQUEST_JWT_KEY } from "src/modules/auth/lib/request.lib";
import { ApiForbidden } from "src/shared/swagger";
import type { Repository } from "typeorm";
import { Board } from "../entities/board.entity";

@Injectable()
class BoardCreatorGuard implements CanActivate {
    public constructor(@InjectRepository(Board) private readonly boardsRepository: Repository<Board>) {}

    public async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest() as Request;

        const { boardId, username } = this.getParams(request);

        const board = await this.findBoard(boardId);

        this.checkPermissions(board, username);

        return true;
    }

    private getParams(request: Request) {
        const boardId = request?.params?.id;

        if (!boardId) {
            throw new BadRequestException("Board id not found");
        }

        const username = (request[REQUEST_JWT_KEY] as JwtPayload)?.username;

        if (!username) {
            throw new BadRequestException("Username in jwt payload not found");
        }

        return { boardId, username };
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

    private checkPermissions(board: Board, username: string) {
        if (board.creator.username !== username) {
            throw new ForbiddenException(`Board with id ${board.id} not belongs to you`);
        }
    }
}

export function BoardCreator() {
    return applyDecorators(UseGuards(BoardCreatorGuard), ApiForbidden("This board not belongs to you"));
}
